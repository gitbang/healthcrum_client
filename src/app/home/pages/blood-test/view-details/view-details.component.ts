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

  ratingArray : Array<number>

  ngOnInit() {
    this.ratingArray = Array(5).fill(0);
    this.service.currentTest.subscribe((result)=>{
      this.data1 = result[0];
      console.log("single test fetch details from client ",result[0])
      if(result){
        let add ;
       this.shownresult = []
        add = {...result[0]}
        this.shownresult.push(add)
        console.log("shown result", this.shownresult);
      }
    })
    //this.service.bloodtestDetailById()
  }
  
  fromServer = {
    what : "",
    when : "",
    why : ""
  };
  totalparams : number = 0;
  data1 : any;
  shownresult = [
    { _id : "", name : "Blood Test",
      parameters : "Thyroid Profile-Total + 73 parameters", 
      reportTAT : "24 hrs",
      totaltest : 12, 
      rating : 3,
      marketprice : 4200,
      healcrumprice : 2500,
      offerprice : 2000,
      type : 'singleTest',
      fasting: "no",
      recommendedFor : {
        male : true,
        female : true,
        kids : true
      },
      recommendedage : {
        from : 40,
        to : 50,
      },
      labLogo : "./assets/img/consulation/logo.png",
      what : `HealthCrum’ 2020 package can help you identify any developing disease so that you can take precautions 
      before it is too late.
       This at-home preventive health checkup consists of 82 important health parameters.
        These include tests like lipid, liver, thyroid, iron, kidney, urine and vitamin test
      . Simply click the button below to book the test now. 10 hours of fasting is mandatory to get accurate results.   
      ndia’s largest health test @ home service, creating a new benchmark for very high quality and honest prices.
       HealthCrum employs state of art 46 touchpoints technology for assuring quality collection and testing across 
    `,
      why : `HealthCrum’ 2020 package can help you identify any developing disease so that you can take precautions 
      before it is too late.
       This at-home preventive health checkup consists of 82 important health parameters.
        These include tests like lipid, liver, thyroid, iron, kidney, urine and vitamin test
      . Simply click the button below to book the test now. 10 hours of fasting is mandatory to get accurate results.   
      ndia’s largest health test @ home service, creating a new benchmark for very high quality and honest prices.
       HealthCrum employs state of art 46 touchpoints technology for assuring quality collection and testing across 
    `,
      when : `HealthCrum’ 2020 package can help you identify any developing disease so that you can take precautions 
      before it is too late.
       This at-home preventive health checkup consists of 82 important health parameters.
        These include tests like lipid, liver, thyroid, iron, kidney, urine and vitamin test
      . Simply click the button below to book the test now. 10 hours of fasting is mandatory to get accurate results.   
      ndia’s largest health test @ home service, creating a new benchmark for very high quality and honest prices.
       HealthCrum employs state of art 46 touchpoints technology for assuring quality collection and testing across 
    `,
      additional_Info : "Here to write additional Info",
      relatedDiseases : ["Typhide", "Cough", "Fever"]
  }
  ]
  profiles = [
    {
      name : "Lipid Test", parameters : 74 , 
      tests : [{name : "individual test", _id : "", type : "singleTest"}]
    }
  ]
  
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
