import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-patient-services',
  templateUrl: './patient-services.component.html',
  styleUrls: ['./patient-services.component.scss']
})
export class PatientServicesComponent implements OnInit {

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
