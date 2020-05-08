import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common'  ;
import {MatDialog} from '@angular/material'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}



@Component({
  selector: 'app-registeration-form',
  templateUrl: './registeration-form.component.html',
  styleUrls: ['./registeration-form.component.scss']
})
export class RegisterationFormComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<RegisterationFormComponent>
  ) {
      dialogRef.disableClose = true
  }
  ngOnInit() {
  }
  genderList: string[] = ["Male", "Female", "other"];
  firstStepper = this._formBuilder.group({
    name : ['', Validators.required],
    email : ['', [Validators.email]],
    contactno : ['',[Validators.required]],
    gender : ['',Validators.required],
    age : ['', Validators.required],
    dob : ['', [Validators.required]],
  })
  secondStepper = this._formBuilder.group({
    employId : ['', Validators.required],
    branch : ['', Validators.required],
    dept : ['', Validators.required],
  })
  matcher = new MyErrorStateMatcher();


  closeDialog(){
    let response = confirm("Are you sure to exit. Your data will lose");
    if(response)
      this.dialogRef.close({result : false});
  }
  submit(){
    if(this.firstStepper.valid && this.secondStepper.valid) {
      let registerationform = this._formBuilder.group({
        firststep : this.firstStepper,
        secondstep : this.secondStepper
      })
      this.dialogRef.close({registerationform, result : true})
    } else{
      console.log("invalid")
      alert("Form input is invalid")
    }
  }
}
