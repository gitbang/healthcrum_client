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
    ) {
      this.dialogRef.disableClose = true;
     }

  userZone : string
  ngOnInit() {
    console.log(this.data)
    console.log("questions passes by the e-prescription", this.data.question)
    // assign this.data.question to hra according to the output required //

    this.userZone = this.data.zone;
    this.userclass = this.userZone == "Red" ? "btn-danger" : (this.userZone =="Border" ? "btn-warning" : (this.userZone == "Below"  ? "btn-info" : "btn-success"))
  }

  //sample questions
  hra : hrainter = {
    physical :  [
      {
        ques : "DO you drink alcohol ?",
        ans : "yes"
      },
      {
        ques : "Do YOU exercise daily ?",
        ans : "yes"
      }
    ],
    lifestyle :  [{
      ques : "Do YOU exercise daily ?",
      ans : "yes"
    }],
    family :  [{
      ques : "Any family problem ?",
      ans : "yes"
    }],
    others :  [{
      ques : "Peer pressure?",
      ans : "yes"
    }]
  }
  // sample quess end 

  userclass = this.userZone == "Red" ? "btn-danger" : (this.userZone =="Border" ? "btn-warning" : (this.userZone == "Below"  ? "btn-info" : "btn-success"))
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

  allanswer= []

  checkCheckBoxvalue(quest, ans, event){
    
    console.log("ques is : ", quest);
    console.log("ans is ", ans);
    console.log("event is ", event);
    var obj = {
      ques : quest,
      ans : ans
    }

    

    if(event == true) {

      this.allanswer.push(obj)

      this.formReasonObj[this.showcategory].push(obj)
      
    }
    else{
      this.allanswer = this.allanswer.filter(x=>x.ques != quest)

      this.formReasonObj[this.showcategory] = this.formReasonObj[this.showcategory].filter((x)=> x.ques != quest)
    }
    //console.log(this.formReasonObj)
    console.log(this.allanswer)
  }

  submit(){
    console.log(this.formReasonObj)
    this.dialogRef.close({success : true ,event : 'close', data : this.formReasonObj, allcombine : this.allanswer})
  }
}
