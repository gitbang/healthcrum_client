import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-patientreports',
  templateUrl: './patientreports.component.html',
  styleUrls: ['./patientreports.component.scss']
})
export class PatientreportsComponent implements OnInit {

  constructor(
    private router : Router,
    private localService : AuthServiceLocal
  ) { }

  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role != 'doctor') {
      this.router.navigateByUrl('/login')
    }
  }

}
