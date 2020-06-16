import { Component, OnInit } from '@angular/core';
import { HomeServiceService} from '../.././../home-service.service'
import * as $ from 'jquery';
import {Router} from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BookModelComponent } from '../book-model/book-model.component';
@Component({
  selector: 'app-view-doctor-details',
  templateUrl: './view-doctor-details.component.html',
  styleUrls: ['./view-doctor-details.component.scss']
})
export class ViewDoctorDetailsComponent implements OnInit {

  constructor(
    private service : HomeServiceService,
    private router : Router,
    private matDialog : MatDialog
  ) { }

  ngOnInit() {
    this.ratingArray = Array(5).fill(0);

    // (<any>$('.slicker')).slick({
    //   // infinite: true,
    //   slidesToShow: 3,
    //   slidesToScroll: 3,
    //   // dots : true,
    //   // arrows : true
    // });

    

    this.service.currendoctor.subscribe((result)=>{
      console.log("doctor detail :", result)
      //this.doctor = null
      if(result) {
        this.doctor = result[0];
      }
      console.log(this.doctor)
    })
    
  }
  rating : number = 3
  ratingArray : Array<number>; 
  doctor = { profilepic : './assets/img/faces/doctor.png',    // profile picture
    name : 'DR. PANKAJ MANORIA',  
    experience : 10 ,                            // add + years
    speciality : 'Heart', 
    consultationFees : 5000,  
    rating : 5,
    timing : '10am - 6pm',                      
    emergency : 'yes',                    // in consultation
    degree : 'MBBS',                      //  delete in qualification
    city : "Mohali",                       // delete in location
    location : {
      city : "mohali",
      state : "Punjab"
    },
    days : ["Sunday", "monday"],
    consultation : {
      emergency : true,
      video : true,
      tele : true,
      physical: true,
    },
    emergencyFees : 2000,
    language : [],
    distance : 5,  
    fromHealthcrum : false,
    gender : 'male',
    pictures : ["./assets/img/partners/p1-omron.png", "./assets/img/partners/p1-omron.png"],
    qualification : ['MBBS'],
    registrationNumber : '12345',
    stream : 'ayurveda',
    consultationTiming: {
      emergency: {from: "8 am", to: "2 pm"},
      physical: {from: "8 am", to : "6pm"},
      tele: {from: "8 am", to: "2 pm"},
      video: {from: "8 am", to: "2 pm"}
    },
    availableDays : ["Monday", "Tuesday", "Wednesday", "Thursday","Friday"]
  }

  slots = ["6am-7am","6am-7am","6am-7am","6am-7am"]
  slideConfig = {
    slidesToShow: 6, 
    slidesToScroll: 4, 
    infinite: true,
    dots: true,
    speed: 300,
  };
  slides = [
    { img: "./assets/img/partners/p1-omron.png" },
    { img: "./assets/img/partners/p2-max.png" },
    { img: "./assets/img/partners/p3-apollo-clinics.png" },
    { img: "./assets/img/partners/p4-rsz_drlalpath_labs.png" },
    { img: "./assets/img/partners/p5-Srl_Diagnostics.jpg.png" },
    { img: "./assets/img/partners/p7-rsz_modern-diagnostic.png" },
    { img: "./assets/img/partners/p7-rsz_modern-diagnostic.png" },
    { img: "./assets/img/partners/p7-rsz_modern-diagnostic.png" },
    { img: "./assets/img/partners/p7-rsz_modern-diagnostic.png" },
    { img: "./assets/img/partners/p7-rsz_modern-diagnostic.png" },
    { img: "./assets/img/partners/p8-dots.png" }
  ];

  openDialog(typeCons : string, index : number){
    console.log(typeCons, index);
    let activeFee = 0;
    if(typeCons == "emergency"){
     // console.log("in emergency")
      activeFee = this.doctor.emergencyFees
    } else {
      activeFee = this.doctor.consultationFees
    }
    console.log("active field ", activeFee);
    const dialog = this.matDialog.open(BookModelComponent, {
      height: "90vh",
      data :{
        type : typeCons,
        fee : activeFee,
        doctor : this.doctor
      }
    })

    dialog.afterClosed().subscribe(result=>{
      console.log(result);
      if(result.success) {
        console.log("after dialog closed")
        console.log(result.userdata, result.data)
        let toSaveInService = {
          userData : result.userdata,
          doctor : result.data
        }
        this.service.ConsultationchangeDoctorSelected(toSaveInService);
        this.router.navigateByUrl('consultation/checkout')
      } else {
        console.log("dialog box closed without booking")
      }
    })
  }
}

