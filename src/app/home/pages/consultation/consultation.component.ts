import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {HomeServiceService } from '../../home-service.service'
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {

  constructor(
    private router : Router,
    private service : HomeServiceService
  ) { }

  ngOnInit() {
  }

  doctors = [ 
    {_id : "1", image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years', speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', emergency : 'yes'},
    {_id : "2",image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years', speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', emergency : 'yes'},
    {_id : "3",image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years', speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', emergency : 'yes'},
    {_id : "4",image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years', speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', emergency : 'yes'},
    {_id : "5",image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years', speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', emergency : 'yes'},
    {_id : "6",image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years', speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', emergency : 'yes'},
    {_id : "7",image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years', speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', emergency : 'yes'},
    {_id : "8",image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years', speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', emergency : 'yes'},
  ]
  knowMore(index){
    console.log(index);
    console.log(this.doctors[index]._id)
    this.service.changedoctor(this.doctors[index])
    this.router.navigateByUrl('/consultation/view-doctor-details/'+ this.doctors[index]._id)
  }
}
