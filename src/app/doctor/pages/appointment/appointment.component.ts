import { Component, OnInit } from "@angular/core";
import {AuthServiceLocal} from '../../../services/auth-service.service'
import {Router} from '@angular/router'
import {DoctorService} from '../../doctor.service'
import Swal from "sweetalert2";
import { FooterComponent } from "app/company/components/footer/footer.component";

declare var $: any;
@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"]
})
export class AppointmentComponent implements OnInit {
  newAppointment: any[] = [
    {
      
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "2020-07-13T18:30:00.000Z",
      time: "03:00 PM",
      patientEmail : "abcd@gmail.com"
    },
  ];
  confirmedAppointment: any[] = [
    {
      appoint_id: "1104",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    },
  ];
  pastAppointment: any[] = [
    {
      appoint_id: "1101",
      patient_name: "Sonam Sharma",
      location: "Delhi",
      date: "12/04/2020",
      time: "08:20 PM"
    },
  ];

  constructor(
    private localService : AuthServiceLocal,
    private router : Router,
    private doctorService : DoctorService
  ) {}

  doctorId : string ;
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
      this.newAppointment = [];
      this.confirmedAppointment = [];
      this.pastAppointment = [];
      if(result.success){

        this.getConfirmationStatusWise(result)
        
      } else {
        Swal.fire("No data found")
      }
    })
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
        orderId : result.data[i].orderDetail.orderDetails._id,
        status : result.data[i].orderDetail.Orderstatus,
        appointmentNum : result.data[i].orderDetail.appointmentNum
      }
      console.log("add is : ", add)
      if( add.status == 'pending' || add.status == undefined )
        this.newAppointment.push(add)
      else if(add.status == 'accepted')
        this.confirmedAppointment.push(add)
      else if(add.status == 'completed')
        this.pastAppointment.push(add)    
    }
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
    this.doctorService.appointmentsChangeStatus( orderId, toSend).subscribe((result)=>{
      console.log(result)
      if(result.success){
        this.getConsultation()
      }
    })
  }

  goToEprescription(){
    console.log("go to eprescription")
    this.router.navigateByUrl('/doctor/e-prescription')
  }
  //"showNotification('top','right',2)"
}
