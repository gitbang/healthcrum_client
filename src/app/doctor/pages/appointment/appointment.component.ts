import { Component, OnInit, ViewChild } from "@angular/core";
import {AuthServiceLocal} from '../../../services/auth-service.service'
import {Router} from '@angular/router'
import {DoctorService} from '../../doctor.service'
import Swal from "sweetalert2";
import { FooterComponent } from "app/company/components/footer/footer.component";
import { query } from "chartist";
import {PatientService} from '../../../patient/patient.service'
import {MatSort, MatTableDataSource, MatPaginator} from "@angular/material"

export interface appointments{
  patient_name: string;
  date: Date;
  time: string;
  patientEmail : string;
  patientId : string;
  orderId : string;
  status : string;
  appointmentNum : string;
  appointmentType : string
}
declare var $: any;
@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"]
})
export class AppointmentComponent implements OnInit {
  newAppointment: any[] = [];
  confirmedAppointment: any[] = [];
  pastAppointment: any[] = [];
  displayedColumns : string[]= ["appointmentNum", "patient_name", "patientEmail", "appointmentType",
                    "date", "time", "others"]

  @ViewChild('confirmeAppointments', {static: true}) paginatorConfirm: MatPaginator;
  @ViewChild('pastAppointments', {static: true}) paginatorPast: MatPaginator;
  @ViewChild('newAppointments', {static: true}) paginatornew: MatPaginator;
  
  constructor(
    private localService : AuthServiceLocal,
    private router : Router,
    private doctorService : DoctorService,
    private patientService : PatientService
  ) {}

  confirmTableData : MatTableDataSource<appointments>
  newTableData : MatTableDataSource<appointments>
  pastTableData : MatTableDataSource<appointments>
  doctorId : string ;
  loading : boolean = true;
  ngOnInit() {

    let role = this.localService.getUserRole();
    if(role != 'doctor') {
      this.router.navigateByUrl('/login')
    }
    this.doctorId = this.localService.getUserID;
    console.log("userId is : ", this.doctorId)
    this.getConsultation();
  }

  getConsultation(){
    console.log("function reached")
    this.doctorService.appointmentGetDetails(this.doctorId).subscribe(result=>{
      console.log("fetch doctor appointments : ", result)
      this.loading = false
      this.newAppointment = [];
      this.confirmedAppointment = [];
      this.pastAppointment = [];
      if(result.success){
        this.getConfirmationStatusWise(result)
        
      } else {
        Swal.fire("No data found")
      }
    }),
    (err=>{this.loading = false})
  }

  getConfirmationStatusWise(result){

    for(let i = 0; i < result.data.length; i++) {
      console.log("loop")
      var add;
      add = {
        patient_name: result.data[i].userDetail.name,   // done
        date: result.data[i].orderDetail.orderDetails[0].dateOfCheckup,  // done
        time:  result.data[i].orderDetail.orderDetails[0].timeOfCheckup,
        patientEmail : result.data[i].orderDetail.orderBy.email,
        patientId : result.data[i].userDetail.userId,
        orderId : result.data[i].orderDetail._id,
        status : result.data[i].orderDetail.Orderstatus,
        appointmentNum : result.data[i].orderDetail.appointmentNum,
        appointmentType : result.data[i].orderDetail.orderDetails[0].type
      }
      console.log("add is : ", add)
      if( add.status == 'pending' || add.status == undefined )
        this.newAppointment.push(add)
      else if(add.status == 'accepted')
        this.confirmedAppointment.push(add)
      else if(add.status == 'completed')
        this.pastAppointment.push(add)    
    }

    this.confirmTableData = new MatTableDataSource(this.confirmedAppointment)
    this.newTableData = new MatTableDataSource(this.newAppointment)
    this.pastTableData = new MatTableDataSource(this.pastAppointment)

    this.confirmTableData.paginator = this.paginatorConfirm;
    this.pastTableData.paginator = this.paginatorPast;
    this.newTableData.paginator = this.paginatornew;
  }

  appointmentDetails : any;
  showNotification(from, align, type_no) {
    const type = ["", "info", "success", "warning", "danger"];

    const color = Math.floor(Math.random() * 4 + 1);
    const msg =
      parseInt(type_no) == 1
        ? "Viewed !"
        : parseInt(type_no) == 2
        ? "Accepted !"
        : "Cancelled !";
    $.notify(
      {
        icon: "notifications",
        message: "Appointment " + msg
      },
      {
        type: type[type_no],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>"
      }
    );
  }

  doAction(action : string, index : number){
    let toSend = {
      Orderstatus : action
    }
    console.log("index is : ", index)
    console.log(this.newAppointment)
    let orderId = this.newAppointment[index].orderId;
    console.log("orderId is " , orderId)
    this.loading = true
    this.doctorService.appointmentsChangeStatus( orderId, toSend).subscribe((result)=>{
      console.log(result)
      if(result.success){
        this.getConsultation()
      } else {
        Swal.fire({text : "Something went wrong"})
        this.loading = false
      }
    }),
    (err=>{this.loading = false})
  }

  goToEprescription(index : number){
    console.log("go to eprescription")
    console.log(this.confirmedAppointment[index])
    this.router.navigate(['/doctor/e-prescription'], {queryParams : {
      patientId : this.confirmedAppointment[index].patientId,
      orderId : this.confirmedAppointment[index].orderId
    }})
  } 
  //"showNotification('top','right',2)"

 
  getPdf(orderId : string){
    console.log(orderId)
    this.patientService.appointmentFetchPDF(orderId).subscribe((result=>{
      console.log(result);
      if(result.success){
        this.completeImageUrl(result.data)
      } else {
        alert("something went wrong")
      }
    }),
    (err)=> console.log("something went wrong", err))
  }

  completeImageUrl(pdfUrl){
    let url = this.patientService.completeURl(pdfUrl)
    window.open(url,  '_blank')
  }

  filterConfirm(value : string){
    this.confirmTableData.filter = value.trim().toLowerCase();
  }

  filterpast(value: string) {
    this.pastTableData.filter = value.trim().toLowerCase();
  }
  filternew(value : string) {
    this.newTableData.filter = value.trim().toLowerCase();
  }
}
