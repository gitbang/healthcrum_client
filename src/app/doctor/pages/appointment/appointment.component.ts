import { Component, OnInit } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"]
})
export class AppointmentComponent implements OnInit {
  newAppointment: any[] = [
    {
      appoint_id: "1102",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "03:00 PM"
    },
    {
      appoint_id: "1103",
      patient_name: "Sonu Yadav",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    },
    {
      appoint_id: "1112",
      patient_name: "sonam Sharma",
      location: "Delhi",
      date: "12/04/2020",
      time: "02:00 PM"
    },
    {
      appoint_id: "1114",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:30 PM"
    },
    {
      appoint_id: "1119",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    }
  ];
  confirmedAppointment: any[] = [
    {
      appoint_id: "1104",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    },
    {
      appoint_id: "1106",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "05:50 PM"
    },
    {
      appoint_id: "1109",
      patient_name: "Sonu Yadav",
      location: "Delhi",
      date: "12/04/2020",
      time: "02:00 PM"
    },
    {
      appoint_id: "1110",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    },
    {
      appoint_id: "1111",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    }
  ];
  pastAppointment: any[] = [
    {
      appoint_id: "1101",
      patient_name: "Sonam Sharma",
      location: "Delhi",
      date: "12/04/2020",
      time: "08:20 PM"
    },
    {
      appoint_id: "1107",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "06:00 PM"
    },
    {
      appoint_id: "1105",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    },
    {
      appoint_id: "1098",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    },
    {
      appoint_id: "1108",
      patient_name: "Amar Verma",
      location: "Delhi",
      date: "12/04/2020",
      time: "01:00 PM"
    }
  ];

  constructor() {}

  ngOnInit() {}

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
}
