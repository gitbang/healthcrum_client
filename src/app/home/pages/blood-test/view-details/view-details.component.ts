import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor(
    //private dialogRef : MatDialogRef<ViewDetailsComponent>,
    //@Inject(MAT_DIALOG_DATA) public data : any,
  ) { 
    // console.log(data)
    // this.shownresult = data
  }
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
  }

  booknow() {
    console.log("book package")
  }

  getCall(){
    console.log("get call")
  }
}
