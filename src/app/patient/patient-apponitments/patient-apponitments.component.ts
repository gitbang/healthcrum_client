import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-patient-apponitments',
  templateUrl: './patient-apponitments.component.html',
  styleUrls: ['./patient-apponitments.component.scss']
})
export class PatientApponitmentsComponent implements OnInit {

  constructor(
    private router : Router,
    private localService : AuthServiceLocal
  ) { }

  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role != 'doctor') {
      this.router.navigateByUrl('/login')
    }

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
