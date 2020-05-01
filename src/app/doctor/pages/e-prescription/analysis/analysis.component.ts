import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export interface hrainter {
  physical : any,
  lifestyle : any,
  family : any,
  others : any
}
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})



export class AnalysisComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

  userZone : string
  ngOnInit() {
    console.log(this.data)
    this.userZone = this.data.zone;
  }
  hra : hrainter = {
    physical :  [
      {
        question : "DO you drink alcohol ?",
        ans : "yes"
      },
      {
        question : "Do YOU exercise daily ?",
        ans : "yes"
      }
    ],
    lifestyle :  [{
      question : "Do YOU exercise daily ?",
      ans : "yes"
    }],
    family :  [{
      question : "Any family problem ?",
      ans : "yes"
    }],
    others :  [{
      question : "Peer pressure?",
      ans : "yes"
    }]
  }

  showcategory : string
  currentdata : Array<any>
  getdetails(category) {
    console.log("reached")
    this.showcategory = category
    this.currentdata = this.hra[category]
    console.log(this.currentdata)
  }
}
