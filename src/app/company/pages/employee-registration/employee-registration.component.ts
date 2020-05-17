import { Component, OnInit, ViewChild } from "@angular/core";
import { DatePipe } from "@angular/common";
import { MatDialog, MatTableDataSource, MatPaginator } from "@angular/material";
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorStateMatcher } from "@angular/material/core";
import { CompanyApiService } from "app/services/company-api.service";
import { RegisterationFormComponent } from "./registeration-form/registeration-form.component";
import { MatIconRegistry } from "@angular/material/icon";
import { CompanyService } from "../../company.service";

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
  name: string;
  email: string;
  contact: number;
  age: number;
  empId: string;
  dept: string;
  branch: string;
}

const list1: empdetails[] = [];

@Component({
  selector: "app-employee-registration",
  templateUrl: "./employee-registration.component.html",
  styleUrls: ["./employee-registration.component.scss"],
})
export class EmployeeRegistrationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private companyApiService: CompanyApiService,
    private dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private service: CompanyService
  ) {}

  //col : string[] = ['name', 'email', 'contact', 'age', 'empId', 'dept', 'branch']
  col: string[] = [
    "empId",
    "name",
    "email",
    "contactNo",
    "age",
    "dept",
    "branch",
  ];

  list: any; //new MatTableDataSource(list1);

  allEmployData: any;
  ngOnInit() {
    this.getemployDetail();
    /*
    this.companyApiService.getEmployeesDetails().subscribe(data => {
      this.empDetails = data;
      //console.log("from databse",this.empDetails)
      //return;
    });*/
  }
  getemployDetail() {
    this.service.registerationGetallEmploy().subscribe((result) => {
      console.log(result);
      this.list = new MatTableDataSource(result.data);
      setTimeout(() => (this.list.paginator = this.paginator));
      console.log("list", this.list);
    });
  }

  isLinear = false;
  email: String;
  genderList: string[] = ["Male", "Female", "other"];
  empDetails: any[];
  page_no = 1;
  matcher = new MyErrorStateMatcher();

  openform() {
    console.log("open form");
    const formport = this.dialog.open(RegisterationFormComponent);
    formport.afterClosed().subscribe((response) => {
      console.log(response);
      if (response.result) {
        this._snackbar.open("New employ", "saved", {
          duration: 2000,
        });
      }
      this.getemployDetail();
    });
  }
  numberOfFiles = 0;
  files: Array<File>;
  filechanged(event) {
    this.numberOfFiles = event.target.files.length;
    this.files = event.target.files;
    console.log(this.files);
  }
  fileupload() {
    const fd: any = new FormData();
    const files: Array<File> = this.files;
    // fd.append('csv', this.files)
    console.log(this.files.length);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i], files[i].name);
      fd.append("upload[]", files[i], files[i].name);
    }
    console.log(fd.toString());
    this.service.uploadCsvFile(fd).subscribe((result) => {
      console.log(result);
    });
  }
  applyFilter(value) {
    this.list.filter = value.trim().toLowerCase();
  }
}
