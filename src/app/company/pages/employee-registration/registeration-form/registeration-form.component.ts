import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CompanyService } from "../../../company.service";

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
  selector: "app-registeration-form",
  templateUrl: "./registeration-form.component.html",
  styleUrls: ["./registeration-form.component.scss"],
})
export class RegisterationFormComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterationFormComponent>,
    private service: CompanyService
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit() {}
  genderList: string[] = ["Male", "Female", "other"];
  firstStepper = this._formBuilder.group({
    name: ["", Validators.required],
    email: ["", [Validators.email]],
    contactNo: ["", [Validators.required]],
    gender: ["", Validators.required],
    age: ["", Validators.required],
    dob: ["", [Validators.required]],
  });
  secondStepper = this._formBuilder.group({
    empId: ["", Validators.required],
    branch: ["", Validators.required],
    dept: ["", Validators.required],
  });
  matcher = new MyErrorStateMatcher();

  closeDialog() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel registration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close({ result: false });
      }
    });
    // let response = confirm("Are you sure to exit. Your data will lose");
    // if(response)
  }
  submit() {
    if (this.firstStepper.valid && this.secondStepper.valid) {
      let registerationform = this._formBuilder.group({
        firststep: this.firstStepper.value,
        secondstep: this.secondStepper.value,
      });
      console.log(registerationform.value);
      this.service
        .addNewEmploy(registerationform.value)
        .subscribe((response) => {
          if (response) {
            this.dialogRef.close({ result: true });
          } else {
            this.dialogRef.close({ result: false });
          }
        });
    } else {
      console.log("invalid");
      alert("Form input is invalid");
    }
  }
}
