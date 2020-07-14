import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-patient-feedback',
  templateUrl: './patient-feedback.component.html',
  styleUrls: ['./patient-feedback.component.scss']
})
export class PatientFeedbackComponent implements OnInit {

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
