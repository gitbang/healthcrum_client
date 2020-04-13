import { Component, OnInit } from "@angular/core";
import { AuthServiceLocal } from "../services/auth-service.service";
import { SocialUser } from "angularx-social-login";
import { Router } from "@angular/router";
@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.scss"]
})
export class PatientComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate(["/patient/hra-report-fill"]);
  }
}
