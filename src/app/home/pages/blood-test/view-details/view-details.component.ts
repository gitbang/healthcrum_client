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
      console.log(result[0])
      if(result){
        let add ;
       //this.shownresult = []
        add = {
          _id : result[0]._id,
          name : result[0].name,
          labLogo : result[0].labLogo,
          parameters : 1,
          marketprice : result[0].marketprice,
          offerprice : result[0].offerprice,
          rating : result[0].rating,
          type : result[0].type,
          fasting : "yes",
          reportTAT : result[0].reportTAT,
          recommendedFor : result[0].recommendedFor,
          recommendedage : result[0].recommendedage,
          what : result[0].what,
          why : result[0].why,
          when : result[0].when
        }
        console.log("add is : ", add)
        this.shownresult.push(add)
      }
    })
    console.log(this.data1)
    this.service.bloodtestDetailById(this.data1._id, {type : this.data1.type}).subscribe((result)=>{
      console.log("specific test : ", result)
    })

  }

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
      recommendedFor : {
        male : true,
        female : true,
        kids : true
      },
      recommendedage : {
        from : 5,
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
    `
    }
  ]
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
