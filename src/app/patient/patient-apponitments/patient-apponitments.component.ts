import { Component, OnInit } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'
import {PatientService} from '../patient.service'

@Component({
  selector: 'app-patient-apponitments',
  templateUrl: './patient-apponitments.component.html',
  styleUrls: ['./patient-apponitments.component.scss']
})
export class PatientApponitmentsComponent implements OnInit {

  constructor(
    private router : Router,
    private localService : AuthServiceLocal,
    private service : PatientService
  ) { }

  userId : string

  ngOnInit() {

    if(!this.localService.isUserLoggedIn)
      this.router.navigateByUrl('/login')
    let role = this.localService.getUserRole();
    if(role == 'doctor') 
      this.router.navigateByUrl('/login')
    

    this.userId =   this.localService.getUserID;
    
    // retrive _id from data and then fetch the required data using that id
 
    this.service.appointmentfetchAppointment(this.userId).subscribe((result)=>{
      console.log(result)

      if(result.success) {
        this.appointments = [];
        for(let i = 0; i < result.data.length; i++) {
          let add ;
          add = {
            doctor_name : result.doctorDetail[i].name,
            speciality : result.doctorDetail[i].speciality,
            date : result.data[i].orderDetails[0].dateOfCheckup,
            fee :  result.data[i].amountDetails.amount,
            type : result.data[i].orderDetails[0].type,
            time : result.data[i].orderDetails[0].timeOfCheckup
          }
          this.appointments.push(add)
        }
        console.log("data is : ", this.appointments)
      }
    })
  }
  
  appointments = [ 
    {number : "123456", 
    doctor_name : "Mr meena", 
    location : "Delhi", 
    lab : "ABC laboratory", 
    date : "12/10/20",
     fee :"2000"}
  ]  

  appointmentsdone = [ 
    {number : "123456", doctor_name : "Mr meena", location : "Delhi", lab : "ABC laboratory", date : "12/10/20", fee :"2000"}
  ]  
}
