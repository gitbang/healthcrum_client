import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeServiceService } from 'app/home/home-service.service';
import { MatStepper } from '@angular/material/stepper';
import {AuthServiceLocal} from '../../../../services/auth-service.service';
import * as moment from 'moment';
import { data } from 'app/company/pages/employee-tracking/show-detail/show-detail.component';

@Component({
  selector: 'app-book-model',
  templateUrl: './book-model.component.html',
  styleUrls: ['./book-model.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookModelComponent implements OnInit {
  data : any;
  constructor(
    @Inject (MAT_DIALOG_DATA) data : any,
    private service : HomeServiceService,
    private fb : FormBuilder,
    private dialog: MatDialogRef<BookModelComponent>,
    private localService : AuthServiceLocal
  ) {
    Date.prototype.toJSON = function(){ return moment(this).format(); }
    this.data = data  
    this.dialog.disableClose = true;
    console.log(this.data.doctor.consultationTimingSlots);
    console.log(this.data.type)
    this.slots = this.data.doctor.consultationTimingSlots[this.data.type]
    //console.log("slots are", this.slots)
   }

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  toDayDate : Date;
  ngOnInit() {

    this.getBookedSlots();

    this.toDayDate =  new Date()
    console.log("the date is : ", this.toDayDate)
    this.firstFormGroup = this.fb.group({
      date: ['', Validators.required],
      timeslot : ['', Validators.required],
      name : ['', Validators.required],
      phoneNo : ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      otp: ['', Validators.required]
    });

    this.checkLogin();
  }

  getBookedSlots(){
    console.log(this.data.doctor.userId);
    this.data2 = []
    this.service.consultationGetBookedSlot(this.data.doctor.userId).subscribe((result)=>{

      console.log(result)
      this.data2 = result.data
    }),(error)=>{
      console.log(error)
    }
  }

  isLoggin : boolean = false;
  userDetails : any;
  checkLogin(){
    this.isLoggin = this.localService.isLoggedIn();
    if(this.isLoggin){
      this.userDetails = this.localService.getUserDetails();
      console.log("user details", this.userDetails);
    }
  }
  slots = ["06:30am" ,"07:30am" ,"08:30am" ,"09:30am" ,"10:30am" ]

  data2 = [
    { date :"2020-08-12T00:00:00+05:30", bookedslotes: ["09:00", "10:00"]}
  ]

  currentDate;
 
  dateChange(event){
    let dateString = event.value.toJSON();
    this.currentDate = dateString.slice(0 ,10);
    this.firstFormGroup.get('timeslot').patchValue('')
    this.bookedslot = ''
  }

  checkSlot(slot){
    if(!this.firstFormGroup.get('date').valid){
      return
    }

    let index = this.data2.map((element)=> {return element.date.slice(0,10)}).indexOf(this.currentDate)

    console.log(index)
    if(index != -1) {
      let bookedSlotes = this.data2[index].bookedslotes;
      if(bookedSlotes.includes(slot)) 
        return true
      else 
        return false
    } else 
      return false
    
  }
  myDate = "2020-08-10T18:30:00.000Z"
  bookedslot : string;
  selected(slot){
  
    if(this.bookedslot == slot) {
      return true
    } else {
      return false
    }
  }
  bookslot(slot){
    if(this.firstFormGroup.get('date').valid){
     
      console.log(this.myDate)
     
      this.bookedslot = slot
    } else {
      Swal.fire({text : "Select valid date"})
    }
  }
  toCheck = {
    userId : 'abcdef',
    phone : null
  }
  submitFirstForm(stepper : MatStepper){

    this.firstFormGroup.get('timeslot').setValue(this.bookedslot)

    if(this.isLoggin){
      this.firstFormGroup.get('name').setValue(this.userDetails.name)
      this.firstFormGroup.get('phoneNo').setValue(this.userDetails.phone)
      if(this.firstFormGroup.valid){
        this.dialog.close({success  : true, data : this.data , userdata : this.firstFormGroup.value})
      } else{
        alert("enter valid input")
        return
      }
    } else {
      this.toCheck = {
        userId : "asdfghjk",
        phone : this.firstFormGroup.get('phoneNo').value.toString()
      }
      console.log(this.toCheck)
      this.generateotp(stepper);
    }
  }
  loading : boolean = false;
  userotp : number;
  generateButton : boolean = false;
  generateotp( stepper : MatStepper){
    this.generateButton = true
    this.service.consultationBookOtpcheck(this.toCheck)
      .subscribe((result)=>{
        this.generateButton = false
        console.log(result)
        if(result.success) {
          if(result.exists){
            this.dialog.close({success  : true, data : this.data , userdata : this.firstFormGroup.value})
            // this.data contain data of the doctor
          } else {
            stepper.next();
          }
        } else {
          alert("something went wrong")
        }
      })
  } 
 
  submitsecondStepper(stepper : MatStepper){
    if(this.secondFormGroup.valid){
      this.loading = true;
      let toSend = {
        otp : this.secondFormGroup.get('otp').value.toString(),
        phone : this.firstFormGroup.get('phoneNo').value.toString(),
       // role : "patient"
      }
      console.log("verify otp : ", toSend);
      this.service.consultationChekOTP(toSend).subscribe((result)=>{
        this.loading = false;
        console.log("data after otp verification",result)
        if(result.success){
          if(result.data.userId.role == 'doctor') {
            Swal.fire("Change your phone number")
            return
          }
          let userdetails = {
            userId : result.data.userId._id,
            name : result.data.name,
            gender : result.data.gender,
            role : result.data.userId.role
          }
         // console.log(userdetails)
          this.localService.saveUser(userdetails)
          console.log("final formGroup value :", this.firstFormGroup.value)
          this.dialog.close({success : true, data : this.data , userdata: this.firstFormGroup.value})
        } else{
          Swal.fire(result.message)
        }
      })
    }
  }

  resend(stepper){
    this.service.consultationResendOTP({phone :this.firstFormGroup.get('phoneNo').value.toString()})
        .subscribe((result)=>{
          console.log(result);
          
        })
  }

  closeDialog() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(result)
      if (result.value) {
        this.dialog.close({success : false})
      }
    })
  }
}
