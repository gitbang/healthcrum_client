import { Component, OnInit, Injectable } from "@angular/core";
import Swal from "sweetalert2";

interface Package {
  name: string;
  
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})

export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  
  package : string = "	ABCPre-Emp"
  currentpackage : string;
  totalpackages : Package[] = [
    { name : "abc" }, {name : "efgh"}
];
  branchChange() {
    console.log("reached")
  }
}
