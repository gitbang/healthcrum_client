import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ERecieptComponent } from '../e-reciept/e-reciept.component';
import { HomeServiceService } from 'app/home/home-service.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog : MatDialog,
    private service : HomeServiceService
  ) { }

  
  ngOnInit() {
    this.service.consultationDoctorSelectedData.subscribe(result=>{
      console.log(result);
      this.completeData = result
    })
  }
  completeData;       // this contain complete data of the doctor as well as the patient
  shownresultarrays =[
      { 
      _id : '',  
      mobileNo : 9874563210,
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

    // this.complete data contain all the required result to book an appointment;

    // call the api for the payment gateway
    
    // after getting the response from gateway send request to book an appointment:
    
    //appointmentDate, from, to, status, doctorEmail, appointmentTime, appointmentType

    let data = {
      appointmentDate : this.completeData.userdata.date,
      appointmentTime : this.completeData.userdata.timeslot,
      appointmentType : this.completeData.data.type,
    }
    
    const dialog = this.dialog.open(ERecieptComponent, {
      height : "90vh",
      width : "60%"
    })

    dialog.afterClosed().subscribe(result=>{
      this.router.navigateByUrl("consultation")
    })
  }




  eData = {
    name : 'Karan',
    gender : 'male',
    requestDate : '10/12/2020',
    checkupDate : '10/12/2020',
    centerName : 'Mohali',
    serviceProvider : 'Dr Meena',
    mrp : 2000,
    discountPrice : 1000,
    totalPrice : 1000,
    gstPercent : 18,
    gstAmount : 180,
    total : 1180,
    paymentMode : 'card',
    status : 'confirmed'
  }
}
