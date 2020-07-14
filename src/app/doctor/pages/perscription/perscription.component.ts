import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../../services/auth-service.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-perscription',
  templateUrl: './perscription.component.html',
  styleUrls: ['./perscription.component.scss']
})
export class PerscriptionComponent implements OnInit {

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
