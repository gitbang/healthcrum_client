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
  faWeight
} from "@fortawesome/free-solid-svg-icons";
import { AuthServiceLocal } from "../../../services/auth-service.service";
import { SocialUser, AuthService } from "angularx-social-login";
import { Router } from "@angular/router";
@Component({
  selector: "app-c-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  private name: String;
  private image: String;
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

  loggedIn: boolean;
  user: SocialUser;

  constructor(
    private authService: AuthService,
    private authLocal: AuthServiceLocal,
    private router: Router
  ) {
    this.loggedIn = this.authLocal.isUserLoggedIn;
    this.user = new SocialUser();
    if (this.loggedIn) {
      this.user.name = this.authLocal.getUserData.name;
      this.user.photoUrl = this.authLocal.getUserData.image;
      this.user.id = this.authLocal.getUserData.id;
    } else {
      this.loggedIn = false;
    }
  }

  ngOnInit() {}

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
}
