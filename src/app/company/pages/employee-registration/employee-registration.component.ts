import { Component, OnInit } from "@angular/core";
import {DatePipe} from '@angular/common'  ;
import {MatDialog} from '@angular/material'
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ErrorStateMatcher } from "@angular/material/core";
import { CompanyApiService } from "app/services/company-api.service";
import { RegisterationFormComponent } from "./registeration-form/registeration-form.component";

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

  constructor(
    private _formBuilder: FormBuilder, 
    private companyApiService: CompanyApiService,
    private dialog : MatDialog,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit() {
   
    let dp = new DatePipe(navigator.language);
    console.log(dp);
    let p = 'dd-MM-y'; // YYYY-MM-DD
    let date = dp.transform(new Date(), p);

    this.companyApiService.getEmployeesDetails().subscribe(data => {
      this.empDetails = data;
      return;
    });

    this.firstStepper.valueChanges.subscribe((value) =>{
      console.log(this.firstStepper.value)
    })
  }

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

  openform(){
    console.log("open form")
    const formport = this.dialog.open(RegisterationFormComponent)
    formport.afterClosed().subscribe((response)=>{
      console.log(response)
      if(response.result) {
        this._snackbar.open("New employ" , "saved", {
          duration : 2000
        })
      }
    })
  }
}
