import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {PatientService} from '../patient.service';
import {MatTableDataSource, MatSort, MatPaginator} from "@angular/material"

export interface appointmentsInter {
  doctor_name : string;
  speciality : string;
  date : Date;
  fee :  number;
  type : string;
  time : string;
  appointmentNum : string;
  status : string;
}

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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    if(!this.localService.isUserLoggedIn)
      this.router.navigateByUrl('/login')
    let role = this.localService.getUserRole();
    if(role == 'doctor') 
      this.router.navigateByUrl('/login')
    

    this.userId =   this.localService.getUserID;
  
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
            time : result.data[i].orderDetails[0].timeOfCheckup,
            appointmentNum : result.data[i].appointmentNum,
            status : result.data[i].Orderstatus

          }
          this.appointments.push(add)
        }
        console.log("data is : ", this.appointments)
        this.appointmentTableData = new MatTableDataSource(this.appointments)
        this.appointmentTableData.paginator = this.paginator
      }
    })
  }

  appointmentTableData : MatTableDataSource<appointmentsInter[]>
  displayedColumns : string[] = ["appointmentNum","doctor_name", "speciality", "type", "date", "time", "fee", "status"]
  appointments : any[]= []  
  applyFilter(value : string){
    this.appointmentTableData.filter = value.trim().toLowerCase();
  }
}
