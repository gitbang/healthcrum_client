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
    private dialog : MatDialogRef<BookModelComponent>

  ) {
    console.log("received data is : " ,data)
    this.data = data  
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
    _id : '123456789',
    phone : null
  }
  submitFirstForm(stepper : MatStepper){
    this.firstFormGroup.get('timeslot').setValue(this.bookedslot)
    console.log(this.firstFormGroup.value);  

    if(this.firstFormGroup.valid){
      this.toCheck = {
        _id : "123456789",
        phone : this.firstFormGroup.get('phoneNo').value
      }
      console.log(this.toCheck)
      this.generateotp( stepper);
    } else {
      alert("Invalid Inputs")
    }
  }

  userotp : number
  generateotp( stepper : MatStepper){
    this.service.consultationBookOtpcheck(this.toCheck)
      .subscribe((result)=>{
        if(result.success) {
          if(result.exists){
            this.dialog.close({success  : true, data : this.data , phone : this.firstFormGroup.value})
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
      let toSend = {
        otp : this.secondFormGroup.get('otp').value,
        phone : this.firstFormGroup.get('phoneNo').value
      }
      this.service.consultationChekOTP(toSend).subscribe((result)=>{
        if(result.success){
          this.dialog.close({success : true, data : this.data , userdata: this.firstFormGroup.value})
        } else{
          alert("OTP did not match")
        }
      })
    }
  }
}