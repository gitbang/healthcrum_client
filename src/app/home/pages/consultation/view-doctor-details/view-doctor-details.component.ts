import { Component, OnInit } from '@angular/core';
import { HomeServiceService} from '../.././../home-service.service'
import * as $ from 'jquery';
import * as slick from 'slick-carousel';

@Component({
  selector: 'app-view-doctor-details',
  templateUrl: './view-doctor-details.component.html',
  styleUrls: ['./view-doctor-details.component.scss']
})
export class ViewDoctorDetailsComponent implements OnInit {

  constructor(
    private service : HomeServiceService
  ) { }

  ngOnInit() {
    (<any>$('.slicker')).slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3
    });

    this.ratingArray = Array(5).fill(0)

    this.service.currendoctor.subscribe((result)=>{
      //this.doctor = result
      console.log(this.doctor)
    })
  }
  rating : number = 3
  ratingArray : Array<number>; 
//  doctor : object
  // doctor = {_id : "1",
  //  image : './assets/img/faces/doctor.png', 
  //  name : 'DR. PANKAJ MANORIA', 
  //  experience : '10+ years',
  //  speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', 
  //  emergency : 'yes', degree : 'MD', physicalConsultant : '10am - 6pm',
  //  registerationNumber : 123456,
  // }
  doctor = { image : './assets/img/faces/doctor.png',    // profile picture
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
    pictures : [],
    profilepic : './assets/img/faces/doctor.png',
    qualification : ['MBBS'],
    registerationNumber : '12345',
    stream : 'ayurveda',
    consultationTiming: {
      emergency: {from: "8 am", to: "2 pm"},
      physical: {from: "8 am", to : "6pm"},
      tele: {from: "8 am", to: "2 pm"},
      video: {from: "8 am", to: "2 pm"}
    }
  }

  slots = ["6am-7am","6am-7am","6am-7am","6am-7am"]
   
 
}

