import { Component, OnInit, ViewChild } from "@angular/core";
import {DatePipe} from '@angular/common'  ;
import {MatDialog, MatTableDataSource, MatPaginator} from '@angular/material'
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

export interface empdetails {
  name : string,
  email : string,
  contact : number,
  age : number,
  empId : string,
  dept : string,
  branch : string
}

const list1 : empdetails[] = [
  {name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry1', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry2', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry3', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry4', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry5', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry6', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry7', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry8', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry9', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' },
  {name : 'harry10', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' }
]

@Component({
  selector: "app-employee-registration",
  templateUrl: "./employee-registration.component.html",
  styleUrls: ["./employee-registration.component.scss"]
})

export class EmployeeRegistrationComponent implements OnInit {

  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator

  constructor(
    private _formBuilder: FormBuilder, 
    private companyApiService: CompanyApiService,
    private dialog : MatDialog,
    private _snackbar : MatSnackBar,
    private service : CompanyService
  ) {}
  col : string[] = ['name', 'email', 'contact', 'age', 'empId', 'dept', 'branch']
  list = new MatTableDataSource(list1);
  
  ngOnInit() { 
    setTimeout(() => this.list.paginator = this.paginator)
    // let dp = new DatePipe(navigator.language);
    // console.log(dp);
    // let p = 'dd-MM-y'; // YYYY-MM-DD
    // //let date = dp.transform(new Date(), p);

    this.companyApiService.getEmployeesDetails().subscribe(data => {
      this.empDetails = data;
      console.log(this.empDetails)
      return;
    });
  }

  isLinear = false;
  email: String;
  genderList: string[] = ["Male", "Female", "other"];
  empDetails: any[];
  page_no = 1;
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
