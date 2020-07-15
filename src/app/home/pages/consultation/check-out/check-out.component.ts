import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ERecieptComponent } from '../e-reciept/e-reciept.component';
import { HomeServiceService } from 'app/home/home-service.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {AuthServiceLocal} from '../../../../services/auth-service.service'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var Razorpay: any; 
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {


  constructor(
    private router: Router,
    private dialog : MatDialog,
    private service : HomeServiceService,
    private ngZone : NgZone,
    private localService : AuthServiceLocal
  ) { }

  
  ngOnInit() {

    // user detail from local storage;
    let data = this.localService.getUserDetails();
    console.log(data)
    if(!data){
      
      console.log("user not loged in");
      this.router.navigateByUrl("/login")

    } else {
      console.log("data from local storage", data)
      this.aboutUser._id = data.userId;
      this.aboutUser.name = data.name;
      this.aboutUser.gender = data.gender;
      this.aboutUser.phone = data.phone;
    } 
    console.log(this.aboutUser)

    this.service.consultationDoctorSelectedData.subscribe(result=>{
      console.log("from client server ", result);
      this.completeData = result
      if(!result || result.length == 0){
        console.log("empty")
        this.router.navigateByUrl('/consultation')
      } else{
        //this.shownresultarrays[0]._id = result[0].doctor.doctor._id;
        this.shownresultarrays[0]._id = result[0].doctor.doctor.userId;
        this.shownresultarrays[0].docname = result[0].doctor.doctor.name;
        this.shownresultarrays[0].type = result[0].doctor.type;
        this.shownresultarrays[0].offerprice = result[0].doctor.fee;
        this.shownresultarrays[0].date = result[0].userData.date;
        this.shownresultarrays[0].timeslot = result[0].userData.timeslot;
        this.shownresultarrays[0].phone = result[0].userData.phoneNo;
        this.aboutUser.name = result[0].userData.name;
        this.aboutUser.phone = result[0].userData.phoneNo;
        // add gender to about user as well when available
      }
    })
    console.log("this. resultarray is : ", this.shownresultarrays[0])
  }
  completeData;       // this contain complete data of the doctor as well as the patient
  shownresultarrays =[
      { 
      _id : '',  
      phone : 9874563210,
      docname : "Dr. AR Kapoor", 
      healcrumprice : 2500, 
      offerprice : 2000,
      type: "video",          // telephone, physical , chat
      timeslot : '06:30am',
      date : '10/12/2020',
      amount : 1500,
      saved : 100,
    }, 
  ]
  placeorder(){
    console.log("place order go to gateway")

    this.razorKeyGeneration()
    
    let data = {
      appointmentDate : this.shownresultarrays[0].date,
      appointmentTime : this.shownresultarrays[0].timeslot,
      appointmentType : this.shownresultarrays[0].type
    }
  }

  razorKeyGeneration(){
    var razorOptions  = {
      amount :  this.shownresultarrays[0].offerprice,
      currency : "INR"
    }
    this.service.RazorPayKeyGeneration(razorOptions).subscribe((response)=>{
      console.log(response)
      if(response.success){
        console.log("proceed for success")

        this.openRazorInterface(response.sub, response.key);

      } else {
        alert("Something went wront. Try again later")
        console.log("something went wrong")
      }
    })
  }

  openRazorInterface(response, key){
    var _this = this
    var options = {
      "key": key, 
      "amount": response.amount, 
      "currency": response.currency,
      "name": this.aboutUser.name,
      "description": "Book Consultation",
      "order_id": response.id, 
      "handler":function(response1){
        _this.service.razorPayVerification(response1).subscribe((result)=>{
          console.log("after verification", result)
          if(result.success){
            
            _this.ngZone.run(()=>{
              _this.savePaymentData(response, response1)
            })   
          }
        })
      },
      "prefill": { 
        "name" : this.aboutUser.name,
        "contact": this.aboutUser.phone
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    console.log("works");
  }
  
  generatePDf(complete){
    this.ngZone.run(()=>{
      const dialog = this.dialog.open(ERecieptComponent, {
        height : "90vh",
        width : "70%",
        data :{
          ...complete,
          user : this.aboutUser,
          save : null,
          date : new Date,
          serviceProvider : this.shownresultarrays[0].docname,
          complete : complete
        }
      })
  
      dialog.afterClosed().subscribe(result=>{
        this.router.navigateByUrl("consultation")
      })
    })
  }

  aboutUser = {
    _id : "5e8efa895b324a3e4c97a278",
    name : "Akash",
    gender : "Male",
    location : "Jalandhar",
    phone : "9779692376",
    healthcrumId : "Health1234"
  }

  savePaymentData(response, response1){

    console.log("shown result array",this.shownresultarrays)

    response.amount = response.amount / 100;
    let complete = {};
    let orderDetail = []
    for(var i = 0; i < this.shownresultarrays.length; i++) {
      let add ;
      let date  = new Date()
      add = {
        productId : this.shownresultarrays[i]._id,
        type : this.shownresultarrays[i].type + "Consultation",
        dateOfCheckup : this.shownresultarrays[0].date,
        time : this.shownresultarrays[0].timeslot,

        forUser : true,
        // forMembers : this.testfor.value[i].others,
        // memberIds : this.allID.others,
      }
      orderDetail.push(add)
    }
    complete = {
      orderDetails : orderDetail,
      ...response,
      ...response1,
      userId : this.aboutUser._id,
      type : "consultation"
    }
    console.log("complete", complete)

    this.generatePDf(complete)
  }
}
