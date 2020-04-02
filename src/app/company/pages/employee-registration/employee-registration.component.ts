import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CompanyApiService } from "app/services/company-api.service";

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: "app-employee-registration",
  templateUrl: "./employee-registration.component.html",
  styleUrls: ["./employee-registration.component.scss"]
})
export class EmployeeRegistrationComponent implements OnInit {
  isLinear = false;
  email: String;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  genderList: string[] = ["Male", "Female", "other"];
  DOB: Date;
  minDate: Date;
  maxDate: Date;
  empDetails: any[];
  page_no = 1;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private _formBuilder: FormBuilder,
    private companyApiService: CompanyApiService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", [Validators.required, Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });

    this.companyApiService.getEmployeesDetails().subscribe(data => {
      this.empDetails = data;
      return;
      if (data._meta.success) {
        this.empDetails = data.result;
      }
      console.log(this.empDetails);
    });
  }

  matcher = new MyErrorStateMatcher();
}
