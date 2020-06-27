import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeServiceService } from 'app/home/home-service.service';
import { MatStepper } from '@angular/material/stepper';

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
    private dialog: MatDialogRef<BookModelComponent>

  ) {
    console.log("received data is : " ,data)
    this.data = data  
    this.dialog.disableClose = true;
   }

   isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  toDayDate : Date;
  ngOnInit() {
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
   // stepper.next();
    this.firstFormGroup.get('timeslot').setValue(this.bookedslot)
    console.log(this.firstFormGroup.value);  

    if(this.firstFormGroup.valid){
      this.toCheck = {
        userId : "asdfghjk",
        phone : this.firstFormGroup.get('phoneNo').value
      }
      console.log(this.toCheck)
      this.generateotp(stepper);
    } else {
      alert("Invalid Inputs")
    }
  }
  loading : boolean = false;
  userotp : number
  generateotp( stepper : MatStepper){
    this.service.consultationBookOtpcheck(this.toCheck)
      .subscribe((result)=>{
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
        otp : this.secondFormGroup.get('otp').value,
        phone : this.firstFormGroup.get('phoneNo').value,
        role : "patient"
      }
      console.log("verify otp : ", toSend);
      this.service.consultationChekOTP(toSend).subscribe((result)=>{
        this.loading = false;
        console.log(result)
        if(result.success){
          this.dialog.close({success : true, data : this.data , userdata: this.firstFormGroup.value})
        } else{
          alert("OTP did not match")
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
  /*
  resend(){
    console.log("resenfotp");
    let toSend = {
      phone : this.firstFormGroup.get('phoneNo').value,
    }
    this.service.consultationResendOTP(toSend).subscribe((result)=>{
      console.log("resend otp", result)
    })
  }
  */
  
}
