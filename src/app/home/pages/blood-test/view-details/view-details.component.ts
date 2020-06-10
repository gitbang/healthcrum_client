import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeServiceService } from 'app/home/home-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor(
   
    
    private service  : HomeServiceService,
    private router : Router
  ) { }

  data1 : Array<any>;
  shownresult = {_id : "abc123", name : "Blood Test", includes : "Thyroid Profile-Total + 73 parameters", 
  reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000}
    
  profiles = [
    {
      name : "Lipid Test", parameters : 74 , 
      parametersAre : ['Cholesterol-Total','HDL Cholesterol Direct',
    'LDL Cholesterol -Direct', 'LDL/HDL RATIO', 'HDL / LDL Cholesterol Ratio',
    'Triglycerides, Serum','Non - HDL Cholesterol, Serum','VLDL']
    },
    {
      name : "Lipid Test", parameters : 74 , 
      parametersAre : ['Cholesterol-Total','HDL Cholesterol Direct',
    'LDL Cholesterol -Direct', 'LDL/HDL RATIO', 'HDL / LDL Cholesterol Ratio',
    'Triglycerides, Serum','Non - HDL Cholesterol, Serum','VLDL']
    },
    {
      name : "Lipid Test", parameters : 74 , 
      parametersAre : ['Cholesterol-Total','HDL Cholesterol Direct',
    'LDL Cholesterol -Direct', 'LDL/HDL RATIO', 'HDL / LDL Cholesterol Ratio',
    'Triglycerides, Serum','Non - HDL Cholesterol, Serum','VLDL']
    },
  ]
  ngOnInit() {
    this.service.currentTest.subscribe((result)=>{
      console.log("in services ",result);
      this.data1 = result;
      console.log("data1 in ngoninit", this.data1)
    })
  }

  singleTestComplete ;
  booknow() {
    console.log("book package")
   // this.service.bookSingleTest(this.data1);
    this.router.navigateByUrl('blood-test/12345')
  }

  getCall(){
    console.log("get call")
  }
}
