import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatTableDataSource } from "@angular/material";

export interface data {
  number: string;
  name: string;
  age: number;
  empId: string;
  dept: string;
  city: string;
  company: string;
  reqDate: string;
  appointementDate: string;
  created_on: string;
}

const list: data[] = [
  {
    number: "101",
    name: "abc",
    age: 19,
    empId: "a1234",
    dept: "103",
    city: "gold",
    company: "delhi",
    reqDate: "10/12/19",
    appointementDate: "20/12/19",
    created_on: "30/12/20",
  },
  {
    number: "101",
    name: "abc",
    age: 19,
    empId: "a1234",
    dept: "103",
    city: "gold",
    company: "delhi",
    reqDate: "10/12/19",
    appointementDate: "20/12/19",
    created_on: "30/12/20",
  },
  {
    number: "101",
    name: "abc",
    age: 19,
    empId: "a1234",
    dept: "103",
    city: "gold",
    company: "delhi",
    reqDate: "10/12/19",
    appointementDate: "20/12/19",
    created_on: "30/12/20",
  },
  {
    number: "101",
    name: "abc",
    age: 19,
    empId: "a1234",
    dept: "103",
    city: "gold",
    company: "delhi",
    reqDate: "10/12/19",
    appointementDate: "20/12/19",
    created_on: "30/12/20",
  },
];

@Component({
  selector: "app-show-detail",
  templateUrl: "./show-detail.component.html",
  styleUrls: ["./show-detail.component.scss"],
})
export class ShowDetailComponent implements OnInit {
  empdata = new MatTableDataSource(list);
  col: string[] = [
    "number",
    "empId",
    "company",
    "city",
    "appointementDate",
    "created_on",
    "reqDate",
  ];
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    // this.empdata = new MatTableDataSource(list);
  }
  ngOnInit() {}
}
