import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../../services/auth-service.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
})
export class MedicalRecordComponent implements OnInit {

  constructor(
    private localService : AuthServiceLocal,
    private router : Router
  ) { }

  ngOnInit() {

    let role = this.localService.getUserRole();
    if(role != 'doctor') {
      this.router.navigateByUrl('/login')
    }
  }

}
