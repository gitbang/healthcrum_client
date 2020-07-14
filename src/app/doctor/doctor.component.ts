import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor(
    private localService : AuthServiceLocal,
    private router : Router
  ) { }

  ngOnInit() {
    let role = this.localService.getUserRole()
    console.log("user role : ", role  )
    if(!role) {
      this.router.navigateByUrl('/login')
    }
  }

}
