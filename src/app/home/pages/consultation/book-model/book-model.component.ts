import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeServiceService } from 'app/home/home-service.service';
import { MatStepper } from '@angular/material/stepper';
import {AuthServiceLocal} from '../../../../services/auth-service.service';


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
    //console.log("received data is : " ,data)
    this.data = data  
    this.dialog.disableClose = true;
    console.log(this.data.doctor.consultationTimingSlots);
    console.log(this.data.type)
    this.slots = this.data.doctor.consultationTimingSlots[this.data.type]
    console.log("slots are", this.slots)
   }

   isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  toDayDate : Date;
  ngOnInit() {

    // User detail from local storage
    

    this.toDayDate =  new Date()
    this.firstFormGroup = this.fb.group({
      date: ['', Validators.required],
      timeslot : ['', Validators.required],
      name : ['', Validators.required],
      phoneNo : ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  slots = ["06:30am" ,"07:30am" ,"08:30am" ,"09:30am" ,"10:30am" ]

  bookedslot : string;
  selected(slot){
    console.log(slot)
    if(this.bookedslot == slot) {
      return true
    } else {
      return false
    }
  }
  bookslot(slot){
    this.bookedslot = slot
  }
  toCheck = {
    userId : 'abcdef',
    phone : null
  }
  submitFirstForm(stepper : MatStepper){
    this.firstFormGroup.get('timeslot').setValue(this.bookedslot)
    console.log(this.firstFormGroup.value);  

    if(this.firstFormGroup.valid){
      this.toCheck = {
        userId : "asdfghjk",
        phone : this.firstFormGroup.get('phoneNo').value.toString()
      }
      console.log(this.toCheck)
      this.generateotp(stepper);
    } else {
      alert("Invalid Inputs")
    }
  }
  loading : boolean = false;
  userotp : number;
  generateButton : boolean = false
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
