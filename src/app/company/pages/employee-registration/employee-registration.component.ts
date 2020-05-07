import { Component, OnInit } from "@angular/core";
import {DatePipe} from '@angular/common'  
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


  registerationForm = this._formBuilder.group({
    date : ['' ],
    firstStepper : this._formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.email]],
      contactno : ['',[Validators.required]],
      dept : ['', Validators.required],
      age : ['', Validators.required],
      dob : ['', [Validators.required]],
    }),
    secondStepper : this._formBuilder.group({
      employId : ['', Validators.required],
      branch : ['', Validators.required],
      gender : ['',Validators.required]
    })
  })

  constructor(
    private _formBuilder: FormBuilder,
    private companyApiService: CompanyApiService
  ) {}

  ngOnInit() {
    
    let dp = new DatePipe(navigator.language);
    console.log(dp);
    let p = 'dd-MM-y'; // YYYY-MM-DD
    let date = dp.transform(new Date(), p);


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", [Validators.required, Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });

    this.companyApiService.getEmployeesDetails().subscribe(data => {
      this.empDetails = data;
      return;
    });

    
    (<FormGroup>this.registerationForm.controls['firstStepper']).controls['date'].setValue(date)
    console.log(this.registerationForm.value)
    
   // const date = new Date()
  }
  date = new Date()
  matcher = new MyErrorStateMatcher();
}
