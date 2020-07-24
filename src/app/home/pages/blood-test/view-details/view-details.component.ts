import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeServiceService } from 'app/home/home-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor(
    private service  : HomeServiceService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ratingArray : Array<number>
    testId : string = '5e747a28f65e736454e98050'
    testType : string = 'packageTest'
    labId : string = "5ec7a931a63d80ed24ad49be"
  ngOnInit() {
    this.route.paramMap.subscribe((result)=>{ 
      this.testId = result['params'].id
    })
    this.route.queryParamMap.subscribe((result)=>{
      this.testType = result['params'].type;
      this.labId = result['params'].labId;
    })
    let data = {
      type : this.testType,
      labId : this.labId
    }
    this.service.bloodtestDetailById(this.testId , data).subscribe((result)=>{
      console.log(result)
      if(result.success){
        this.insertFetchedData(result.data, result.lab)
      } else {
        console.log("something went wrong")
        this.router.navigateByUrl('/blood-test')
      }
    })

    this.ratingArray = Array(5).fill(0);
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
      parameter : "Thyroid Profile-Total + 73 parameters", 
      parameters : [],
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
   this.singleTestComplete = []
   this.singleTestComplete.push(this.shownresult[0]);
   this.service.bookSingleTest(this.singleTestComplete);
   // here add code to store data to local storage
   this.router.navigateByUrl('blood-test/' + this.shownresult[0]._id)
  }

  getCall(){
    console.log("get call")
  }
  insertFetchedData(result : any[], lab: any) {
    
      console.log("reached")
      console.log("lab is : ", lab)
      console.log(result)
      if(this.testType == 'packageTest'){
        console.log("entered")
        let add 
        let list : Array<string> = []
        result.forEach((pack)=>{
          console.log("in for each")
          list.push(pack.name)
          let offers  = pack.offerPrice / pack.mrp * 100;
          offers = 100 - Math.round(offers)
          add = {
            _id         : pack._id,
            name        : pack.name,
            labLogo     : lab[0].logo,
            parameter   : pack.individualTests.length,
            parameters  : pack.parameters, 
            marketprice : pack.mrp,
            offerprice  : pack.offerPrice,
            rating      : lab[0].rating,
            type        : this.testType,
            fasting     : pack.fasting,
            reportTAT   : pack.reportingTime.within,
            recommendedFor : {
              ...pack.recommended_for
            },
            recommendedage : {
              ...pack.recommended_age
            },
            what : pack.what,
            why : pack.why,
            when : pack.when,
            offer : offers,
            labId : lab[0]._id,
            additional_Info : pack.additional_Info,
            relatedDiseases : pack.relatedDiseases,
          }
        })
        this.shownresult = [];
        this.shownresult.push(add)
        console.log("final shown result", this.shownresult)
        //this.packageTest = list
      }
      if(this.testType == 'singleTest') {   
        let add ;
        let list : Array<string> = []
        result.forEach((pack)=>{
          // this.getRating(pack.lab.rating);
          list.push(pack.name)
          let offers  = pack.offerPrice / pack.mrp * 100;
          offers = 100 - Math.round(offers)
          add = {
            _id         : pack._id,
            name        : pack.name,
            labLogo     : lab[0].logo,
            parameter   : 1,
            marketprice : pack.mrp,
            offerprice  : pack.offerPrice,
            rating      : lab[0].rating,
            type        : 'singleTest',
            fasting     : pack.fasting,
            reportTAT : pack.reportingTime.within,
            recommendedFor : {
              ...pack.recommended_for
            },
            recommendedage : {
              ...pack.recommended_age
            },
            what : pack.what,
            why : pack.why,
            when : pack.when,
            offer : offers,
            labId : lab[0]._id,
            additional_Info : pack.additional_Info,
            relatedDiseases : pack.relatedDiseases
          }
        })
        this.shownresult = [];
        this.shownresult.push(add)
        //this.singleTest = list
      } 
      if(this.testType == 'profileTest') {
        let add ;
        let list : Array<string> = []
        result.forEach((pack)=>{
          list.push(pack.name)
          let offers  = pack.offerPrice / pack.mrp * 100;
          offers = 100 - Math.round(offers)
          add = {
            _id : pack._id,
            name : pack.name,
            labLogo : lab[0].logo,
            parameter : pack.individualTests.length,
            parameters  : pack.parameters,
            marketprice : pack.mrp,
            offerprice : pack.offerPrice,
            rating : lab[0].rating,
            type : 'profileTest',
            fasting : pack.fasting,
            reportTAT : pack.reportingTime.within,
            recommendedFor : {
              ...pack.recommended_for
            },
            recommendedage : {
              ...pack.recommended_age
            },
            what : pack.what,
            why : pack.why,
            when : pack.when,
            offer : offers,
            labId : lab[0]._id,
            additional_Info : pack.additional_Info,
            relatedDiseases : pack.relatedDiseases
          }
        })
        this.shownresult = [];
        this.shownresult.push(add)
        //this.profileTest = list
      }
      console.log("final shown result is : ", this.shownresult)
    // this.afterFetch();
  }
}
