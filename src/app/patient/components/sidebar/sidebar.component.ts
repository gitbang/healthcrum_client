import { Component, OnInit } from "@angular/core";
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
  faFileMedicalAlt
} from "@fortawesome/free-solid-svg-icons";
import { AuthServiceLocal } from "../../../services/auth-service.service";
import { SocialUser, AuthService } from "angularx-social-login";
import { Router } from "@angular/router";
import { PatientService } from "app/patient/patient.service";
@Component({
  selector: "app-p-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
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
  prescription = faFileMedicalAlt;
  loggedIn: boolean;
  user: SocialUser;
  role:boolean = false;
  userID:String = "";
  blinking = false;
  constructor(
    private authService: AuthService,
    private authLocal: AuthServiceLocal,
    private router: Router,
    private patientService: PatientService,
  ) {
    this.userID = this.authLocal.getUserID;
    this.loggedIn = this.authLocal.isUserLoggedIn;
    this.user = new SocialUser();
    if (this.loggedIn) {
      try{
         this.user.name = this.authLocal.getUserData.name;
      this.user.photoUrl = this.authLocal.getUserData.image;
      this.user.id = this.authLocal.getUserData.id;
      // this.user.id = this.authLocal.getUserData.healthcrumId;
      let role = this.authLocal.getUserData.role;
        if(role === "employee"){
          this.role = true;
        }
      }catch(err){
        this.loggedIn = false;
      }
    } else {
      this.loggedIn = false;
    }
  }

  ngOnInit() {
    this.askWeeklyQuestion();
  }

  getName(): String {
    return this.user.name;
  }

  getImage(): String {
    if (this.user.photoUrl == null) return "/assets/img/avatar.png";
    return this.user.photoUrl;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  signOutUser() {
    this.authService.signOut();
    this.authLocal.logoutUser();
    this.user = null;
    this.loggedIn = false;
    this.router.navigate(["/login"]);
  }

  askWeeklyQuestion() {
    this.patientService.getWeeklySettings().subscribe((res: any) => {
      if (res.success) {
        res = res.data[0];
        let d = new Date();
        if (res.days.filter((el) => el === d.getDay()).length > 0) {
          this.needToAskQuestion();
        } 
      } 
    });
  }
  needToAskQuestion() {
    this.patientService
      .needToAskQuestion({ user_id: this.userID })
      .subscribe((res: any) => {
        if (res.success) {
          if (res.data.length == 0 || res.data.weeklyAns == "") {
            this.blinking = true;
          } else {
            this.blinking = false;
          }
        }
      });
  }
}
