import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {PatientService} from '../patient.service'

@Component({
  selector: 'app-patient-perscription',
  templateUrl: './patient-perscription.component.html',
  styleUrls: ['./patient-perscription.component.scss']
})
export class PatientPerscriptionComponent implements OnInit {

  constructor(
    private router : Router,
    private localService : AuthServiceLocal,
    private patientService : PatientService
  ) { }

  patientId : string;
  patientName : string
  ngOnInit() {
    let login = this.localService.isUserLoggedIn;
    if(!login) {
      this.router.navigateByUrl('/login')
      return
    }

    let role = this.localService.getUserRole();
    if(role == 'doctor') {
      this.router.navigateByUrl('/login')
      return
    }

    this.patientId = this.localService.getUserID;
    if(!this.patientId){
      this.router.navigateByUrl('/login');
      return
    }   
    
    this.patientName = this.localService.getUserName
    if(!this.patientName) {
      console.log("name not found")
    }

    this.getAllPrescription();
  }


  saveAllPrescription : any[] = []
  prescriptionTOshow : any[] = [];
  getAllPrescription(){
    console.log("reached")
    this.patientService.prescriptionGetall(this.patientId).subscribe((result)=>{
      console.log("all prescription are : ", result)
      if(result.success){
        this.saveAllPrescription = result
        this.addPrescription(result.data)
      }
    })
  }

  addPrescription(data){
    for(let i = 0; i < data.length; i++) {
      let add ;
      add = {
        doctorName : data[i].doctorName,
        appointmentNum : data[i].orderId.appointmentNum,
        patientName : this.patientName
      }
      console.log("add ", add)
      this.prescriptionTOshow.push(add)
    }
    console.log(this.prescriptionTOshow)
  }
}
