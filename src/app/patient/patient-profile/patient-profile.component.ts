import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  constructor(
    private router : Router,
    private localService : AuthServiceLocal
  ) { }

  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role == 'doctor') {
      this.router.navigateByUrl('/login')
    }
  }

}
