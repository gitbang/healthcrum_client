import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-employee-tracking",
  templateUrl: "./employee-tracking.component.html",
  styleUrls: ["./employee-tracking.component.scss"]
})
export class EmployeeTrackingComponent implements OnInit {
  picker_end: String;
  picker_start: String;
  constructor() {}

  ngOnInit() {}
}
