import { Component, OnInit, Inject } from "@angular/core";
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
    private service: CompanyService,
    @Inject(MAT_DIALOG_DATA) public info: any
  ) {
    if (info.type == "update") {
      this.fillform(info.info);
      this.update = true;
    }
    dialogRef.disableClose = true;
  }
  ngOnInit() {}
  update: boolean = false;
  fillform(info) {
    this.firstStepper.get("name").setValue(info.name);
    this.firstStepper.get("email").setValue(info.email);
    this.firstStepper.get("contactNo").setValue(info.contactNo);
    this.firstStepper.get("gender").setValue(info.gender);
    this.firstStepper.get("age").setValue(info.age);
    this.firstStepper.get("dob").setValue(info.dob);
    this.firstStepper.get("_id").setValue(info._id);

    this.secondStepper.get("empId").setValue(info.empId);
    this.secondStepper.get("branch").setValue(info.branch);
    this.secondStepper.get("dept").setValue(info.dept);
  }
  genderList: string[] = ["Male", "Female", "other"];
  firstStepper = this._formBuilder.group({
    _id: [""],
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

  secondFormGroup = this._formBuilder.group({});
  matcher = new MyErrorStateMatcher();
  isLinear;
  minDate = new Date('1/01/1990');
  maxDate = new Date();

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
      if (this.update) {
        let registerationform = this._formBuilder.group({
          firststep: this.firstStepper.value,
          secondstep: this.secondStepper.value,
        });
        this.service
          .registerationupdate(registerationform.value)
          .subscribe((result) => {
            if (result.success) {
              this.dialogRef.close({ success: "true", data: "updated" });
            }
          });
      } else {
        let registerationform = this._formBuilder.group({
          firststep: this.firstStepper.value,
          secondstep: this.secondStepper.value,
        });
        console.log("form");
        console.log(registerationform.value);
        this.service
          .addNewEmploy(registerationform.value)
          .subscribe((response) => {
            if (response) {
              this.dialogRef.close({ success: true, data: "saved" });
            } else {
              this.dialogRef.close({ success: false });
            }
          });
      }
    } else {
      console.log("invalid");
      alert("Form input is invalid");
    }
  }
}
