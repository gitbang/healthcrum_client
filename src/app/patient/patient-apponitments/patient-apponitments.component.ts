import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-apponitments',
  templateUrl: './patient-apponitments.component.html',
  styleUrls: ['./patient-apponitments.component.scss']
})
export class PatientApponitmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // check role from local storage

    // send token to backend for fetching data in it;

    // retrive _id from data and then fetch the required data using that id

    // 
  }

  appointments = [ 
    {number : "123456", doctor_name : "Mr meena", location : "Delhi", lab : "ABC laboratory", date : "12/10/20", fee :"2000"}
  ]  

  appointmentsdone = [ 
    {number : "123456", doctor_name : "Mr meena", location : "Delhi", lab : "ABC laboratory", date : "12/10/20", fee :"2000"}
  ]  
}
