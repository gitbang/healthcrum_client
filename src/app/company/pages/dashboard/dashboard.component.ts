import { Component, OnInit, Injectable } from "@angular/core";
import Swal from "sweetalert2";
import {CompanyService} from '../../company.service'
interface Package {
  name: string;
  
}
interface ZoneValue {
  total : number
  red : number,
  purple : number,
  yellow : number,
  green : number
}
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})

export class DashboardComponent implements OnInit {
  constructor(private service : CompanyService) {}

  currentData : ZoneValue = {
    total : 50,
    red : 10,
    purple : 15,
    green : 7,
    yellow : 18
  }
  percentage : any
  ngOnInit() {

    // get company details and total packages of the company
    this.service.dataForAllPackages(this.companyName).subscribe(
      (result)=>{},
    //  this.currentData = result
      (error)=> console.log(error)
    ),
    this.percentage = {
      red : Math.round(this.currentData.red/ this.currentData.total * 100),
      purple : Math.round(this.currentData.purple/ this.currentData.total * 100),
      yellow : Math.round(this.currentData.yellow / this.currentData.total * 100),
      green : Math.round(this.currentData.green / this.currentData.total * 100),
    }
    console.log(this.percentage)
  }
  
  companyName= "myCompany";  // in dynamic change this company name to the company which sign in
  package : string = "	ABCPre-Emp"
  currentpackage : string;
  totalpackages : Package[] = [
    {name : "ABCPre-Emp" },
    {name : "ABCPre-Emp"},
    {name : "ABCPre-Emp"},
    {name : "ABCPre-Emp"},
    {name : "ABCPre-Emp"},
  ];
  onChange(event){
   // console.log("reached")
    console.log(event)
    // send http request
  }
}
