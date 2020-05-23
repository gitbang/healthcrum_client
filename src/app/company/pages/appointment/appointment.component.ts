import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import {
  ErrorStateMatcher,
  MatTableDataSource,
  MatPaginator,
} from "@angular/material";

import { MatDialog } from "@angular/material";
import { ShowListComponent } from "./show-list/show-list.component";
import { CompanyService } from "../../company.service";

export interface empdetails {
  healthcrumId: string;
  name: string;
  email: string;
  contact: number;
  age: number;
  empId: string;
  dept: string;
  branch: string;
  dob: string;
  gender: string;
}

const list1: empdetails[] = [
  {
    healthcrumId: "123456",
    name: "akash",
    email: "ab@gmail.com",
    contact: 9874563210,
    age: 20,
    empId: "109",
    dept: "warehouse",
    branch: "any",
    gender: "male",
    dob: "10/12/12",
  },
];

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"],
})
export class AppointmentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: CompanyService
  ) {}
  // company;
  toppings = new FormControl();
  toppingList: string[] = ["Delhi", "Mumbai", "UP", "punjab"];
  displaydata = {
    branch: ["branch 1", "branch 2", "branch 3", "branch 4", "branch 5"],
    packages: ["package 1", "package 2", "package 3", "package 4", "package 5"],
    city: ["city 1", "city 2", "city 3", "city 4", "city 5"],
    centre: ["centre 1", "centre 2", "centre 3", "centre 4", "centre 5"],
  };
  ngOnInit() {
    setTimeout(() => (this.list.paginator = this.paginator));
  }

  book = this.fb.group({
    branch: ["", Validators.required],
    package: ["", Validators.required],
    city: ["", Validators.required],
    diagnosticCenter: ["", Validators.required],
    date: ["", Validators.required],
    time: ["", Validators.required],
    empId: ["", Validators.required],
  });

  bookappointment() {
    this.service.bookappointment(this.book.value).subscribe((response) => {});
  }

  seedetail() {
    console.log("show table");
    let data1;
    this.service.appointmentDetailOfAllEmploy().subscribe((result) => {
      data1 = result;
      console.log("employ details");
      console.log(data1);
      const dialog = this.dialog.open(ShowListComponent, {
        data: {
          result: data1.response,
        },
        height: "80%",
        width: "80%",
      });
      dialog.afterClosed().subscribe((response) => {
        console.log("response ", response);
      });
    });
  }

  // for table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  col: string[] = [
    "select",
    "healthcrumId",
    "empId",
    "name",
    "age",
    "dept",
    "branch",
    "dob",
    "gender",
  ];
  list = new MatTableDataSource(list1);

  applyFilter(value) {
    this.list.filter = value.trim().toLowerCase();
  }

  employselected = [];

  checkboxChange(i, event, empId) {
    console.log(i);
    console.log(event);
    if (event.checked == true) {
      this.employselected.push(empId);
      //console.log(this.employselected)
    } else {
      this.employselected = this.employselected.filter((x) => x != empId);
    }
    console.log(this.employselected);
    this.book.get("empId").setValue(this.employselected);
  }

  employsOFBranch: any;
  branchChange(event) {
    console.log(event);
    this.service
      .appointmentGetDetailsOfEmploysByBranch(event.value)
      .subscribe((result) => {
        this.employsOFBranch = result;
      });
  }

  selectAll() {}
}
