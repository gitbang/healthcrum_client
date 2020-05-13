import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
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

  constructor( private fb : FormBuilder) {}
  company;
  toppings = new FormControl();
  toppingList: string[] = ["Delhi", "Mumbai", "UP", "punjab"];
  displaydata = {
    branch : ["branch 1","branch 2","branch 3","branch 4","branch 5"],
    packages : ["package 1","package 2","package 3","package 4","package 5"],
    city : ["city 1","city 2","city 3","city 4","city 5"],
    centre :["centre 1","centre 2","centre 3","centre 4","centre 5",],
  }
  ngOnInit() {}

  book = this.fb.group ({
    branch : ['', Validators.required],
    package :['', Validators.required],
    city : ['', Validators.required],
    center : ['', Validators.required],
    date : ['', Validators.required],
    time : ['', Validators.required]
  })
  bookappointment(){
    console.log(this.book.value);
    console.log(this.book.valid);
    console.log(this.book)
  }
  seedetail(){
    console.log("show table")
  }
}
