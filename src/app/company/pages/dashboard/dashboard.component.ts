import { Component, OnInit, Injectable } from "@angular/core";
import { CompanyService } from "../../company.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthServiceLocal } from "app/services/auth-service.service";

interface Package {
  name: string;
}
interface ZoneValue {
  total: number;
  red: number;
  purple: number;
  yellow: number;
  green: number;
}
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private service: CompanyService,
    private _snackBar: MatSnackBar,
    private authLocal: AuthServiceLocal,
  ) {
    this.getEmpCovidAnswers();
    this.getEmployeesHRAReport();
  }

  covid19Data = {
    total : {v: 100 , p: 100},
    danger: {v: 20 , p: 20},
    no_entry: {v: 0 , p: 0},
    safe: {v: 70 , p: 70}
  };
  covidAns = {};
  currentData: ZoneValue = {
    total: 0,
    red: 0,
    purple: 0,
    green: 0,
    yellow: 0,
  };
  percentage = {
    red: 0,
    total: 0,
    purple: 0,
    yellow: 0,
    green: 0,
  };

  ngOnInit() {
    
  }

  getEmployeesHRAReport(){
    this.service.dataForAllPackages(this.companyName).subscribe(
      (result) => {
        if (result.success) {
          result = result.data;
          this.currentData.red = result.danger;
          (this.currentData.purple = result.needAttention),
            (this.currentData.green = result.green),
            (this.currentData.yellow = result.border);
          this.currentData.total =
            result.danger + result.needAttention + result.green + result.border;
          this.percentage = {
            total: this.currentData.total,
            red: Math.round(
              (this.currentData.red / this.currentData.total) * 100
            ),
            purple: Math.round(
              (this.currentData.purple / this.currentData.total) * 100
            ),
            yellow: Math.round(
              (this.currentData.yellow / this.currentData.total) * 100
            ),
            green: Math.round(
              (this.currentData.green / this.currentData.total) * 100
            ),
          };
        } else {
          this._snackBar.open("Somthing went wrong. Try after sometime", "", {
            duration: 2000,
          });
        }
      },
      //  this.currentData = result
      (error) => console.log(error)
    );
  }

  getAllTemperature(){
    let data = {
      corporate_id: this.authLocal.getUserCorporateID,
      branch_id: this.authLocal.getUserBranchID,
    };
    this.service.getAllTemperatures(data).subscribe((res:any)=>{
      console.log(res);
       let danger = 0;
       let safe = 0;
       let no_entry = 0;
       let tempdata = {};
        if (res.success) {
          this.covid19Data.total.v = res.data.length;
          res.temperature.forEach((temp) => {
            if( ! tempdata[temp.user_id] == undefined){
              if( tempdata[temp.user_id] < temp.temperature){
                tempdata[temp.user_id] = temp.temperature;
              }
            }
            tempdata[temp.user_id] = temp.temperature;
          });

          for(let i=0; i<res.data.length;i++){
            if(tempdata[res.data[i].userId] > 98.5 || this.covidAns[res.data[i].userId]){
              danger = danger + 1;
            }else if(tempdata[res.data[i].userId] < 98.5){
              safe = safe + 1;
            }
            else{
             no_entry = no_entry + 1;
            }
          }
          this.covid19Data.danger.v = danger;
          this.covid19Data.safe.v = safe;
          this.covid19Data.no_entry.v = no_entry;
          this.covid19Data.no_entry.v = this.covid19Data.total.v - (danger + safe);
          this.covid19Data.danger.p = Math.round((danger/this.covid19Data.total.v) * 100);
          this.covid19Data.safe.p = Math.round((this.covid19Data.safe.v/this.covid19Data.total.v ) * 100);
          this.covid19Data.no_entry.p = Math.round((this.covid19Data.no_entry.v/this.covid19Data.total.v) * 100);
      }
    })
  }
  getEmpCovidAnswers(){
    let data = {
      corporate_id: this.authLocal.getUserCorporateID,
      branch_id: this.authLocal.getUserBranchID,
    };
    this.service.getCovidAnswers(data).subscribe((res:any)=>{
      console.log(res);
        if(res.success){
          res.data.forEach((el:any) => {
          let inititalans = JSON.parse(el.answers ? el.answers : "{}");
          let weeklyans = JSON.parse(el.weeklyAns ? el.weeklyAns : "{}");
          let status = false;
          if(inititalans.status == "danger" || inititalans.status == "purple") status = true;
          if(weeklyans.status == "danger" || weeklyans.status == "purple") status = true;
          this.covidAns[el.user_id] = status;
          this.getAllTemperature();
          });
        }
    })
  }

  companyName = "myCompany"; // in dynamic change this company name to the company which sign in
  package: string = "ABCPre-Emp";
  currentpackage: string;
  totalpackages: Package[] = [
    { name: "ABCPre-Emp" },
    { name: "ABCPre-Emp" },
    { name: "ABCPre-Emp" },
    { name: "ABCPre-Emp" },
    { name: "ABCPre-Emp" },
  ];
  onChange(event) {
    console.log(event);
  }

  reloadCovidDetails(){
    this.getEmpCovidAnswers();
  }
}
