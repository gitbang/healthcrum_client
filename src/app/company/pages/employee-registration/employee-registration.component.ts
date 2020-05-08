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
import {MatIconRegistry} from '@angular/material/icon';
import {CompanyService} from '../../company.service'

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
    private _snackbar : MatSnackBar,
    private service : CompanyService
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
  }

  isLinear = false;
  email: String;
  genderList: string[] = ["Male", "Female", "other"];
  empDetails: any[];
  page_no = 1;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
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
  numberOfFiles = 0;
  files : Array<File>
  filechanged(event){
    this.numberOfFiles = event.target.files.length;
    this.files = event.target.files;
    console.log(this.files)
  }
  fileupload(){
    const fd : any = new FormData();
    const files: Array<File> = this.files;
    // fd.append('csv', this.files)
    console.log(this.files.length)
    for(let i = 0; i < files.length; i++) {
      console.log(files[i], files[i].name)
      fd.append('upload[]',files[i], files[i].name)
    }
    console.log(fd.toString())
    this.service.uploadCsvFile(fd).subscribe((result)=>{
      console.log(result)
    })
  }
}
