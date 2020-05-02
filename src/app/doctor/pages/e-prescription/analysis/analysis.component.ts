import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(
    public dialogRef: MatDialogRef<hrainter>,
     @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  userZone : string
  ngOnInit() {
    console.log(this.data)
    this.userZone = this.data.zone;
    console.log("userzone is :" , this.userZone)
    console.log("current length",   this.currentdata.length)
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
  userclass = this.userZone == "Red" ? "btn-danger" : (this.userZone =="Green" ? "btn-success" : (this.userZone == "Yellow" ? "btn-warning" : "btn-primary"))
  showcategory : string
  currentdata = [ ]
  getdetails(category) {
    console.log("reached")
    this.showcategory = category
    this.currentdata = this.hra[category]
    console.log(this.currentdata)
  }

  formReasonObj = {
    physical : [],
    lifestyle : [],
    family : [],
    others : []
  }

   checkCheckBoxvalue(quest, ans, event){
    
    console.log("ques is : ", quest);
    console.log("ans is ", ans);
    console.log("event is ", event);
    var obj = {
      question : quest,
      answer : ans
    }
    if(event == true) {
      this.formReasonObj[this.showcategory].push(obj)
    }
    else{
      this.formReasonObj[this.showcategory] = this.formReasonObj[this.showcategory].filter((x)=> x.question!= quest)
    }
    console.log(this.formReasonObj)
  }

  submit(){
    this.dialogRef.close({event : 'close', data : this.formReasonObj})
  }
}
