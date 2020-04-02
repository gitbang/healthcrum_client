import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-booked-appointment",
  templateUrl: "./booked-appointment.component.html",
  styleUrls: ["./booked-appointment.component.scss"]
})
export class BookedAppointmentComponent implements OnInit {
  picker_end: String;
  picker_start: String;
  constructor() {}

  ngOnInit() {}
}
