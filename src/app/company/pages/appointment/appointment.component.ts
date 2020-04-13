import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  faBezierCurve,
  faHospital,
  faFlask,
  faUserMd,
  faBoxOpen,
  faVials,
  faStethoscope,
  faFirstAid,
  faMedkit,
  faNotesMedical,
  faWeight,
  faCity,
  faCodeBranch
} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"]
})
export class AppointmentComponent implements OnInit {
  faBezierCurve = faBezierCurve;
  faHospital = faHospital;
  faFlask = faFlask;
  faUserMd = faUserMd;
  faBoxOpen = faBoxOpen;
  faVials = faVials;
  profiles = faStethoscope;
  parameter = faFirstAid;
  package = faMedkit;
  weight = faWeight;
  report = faNotesMedical;
  faCity = faCity;
  faBranch = faCodeBranch;

  constructor() {}
  company;
  toppings = new FormControl();
  toppingList: string[] = ["Delhi", "Mumbai", "UP", "punjab"];
  ngOnInit() {}
}
