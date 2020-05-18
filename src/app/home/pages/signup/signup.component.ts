import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import {
  faFacebookSquare,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import {
  faUserMd,
  faBuilding,
  faUserInjured,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService, SocialUser } from "angularx-social-login";
import { AuthServiceLocal } from "../../../services/auth-service.service";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "angularx-social-login";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  user_dob = new FormControl();
  google = faGooglePlusG;
  fb = faFacebookSquare;
  patient = faUserInjured;
  company = faBuilding;
  doctor = faUserMd;

  user_email: String;
  user_pass: String;
  user_name: String;
  user_cpass: String;
  user_mob: String;
  user_type: String;
  user_gender: String = "none";
  agree = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private authLocal: AuthServiceLocal,
    private router: Router,
    public dialog: MatDialog
  ) {
    // $(document).ready(() => {});
  }

  ngOnInit() {}
  signupUser(): void {
    if (this.user_name == "" || this.user_name == undefined) {
      $("#fname").focus();
      swal.fire("Please enter your full name");
      return;
    }
    if (this.user_email == "" || this.user_email == undefined) {
      $("#email").focus();
      swal.fire("Please enter your email address");
      return;
    }
    if (this.user_mob == "" || this.user_mob == undefined) {
      $("#mob").focus();
      swal.fire("Please enter Phone Number");
      return;
    }
    if (this.user_gender == "none" || this.user_gender == undefined) {
      $("#gender").focus();
      swal.fire("Please select your gender");
      return;
    }
    if (this.user_pass == "" || this.user_pass == undefined) {
      $("#pass").focus();
      swal.fire("Please enter password for account");
      return;
    }
    if (this.user_cpass == "" || this.user_cpass == undefined) {
      $("#cpass").focus();
      swal.fire("Please confirm password");
      return;
    }
    if (this.user_pass != this.user_cpass) {
      $("#cpass").focus();
      swal.fire("password doesn't matches");
      return;
    }
    if (!this.user_type) {
      swal.fire("Please choose user type");
      return;
    }
    if (!this.agree) {
      swal.fire("please accept terms and conditions");
      return;
    }
    let data = {
      name: this.user_name,
      email: this.user_email,
      password: this.user_pass,
      phone: this.user_mob,
      gender: this.user_gender,
      user_type: this.user_type,
    };
    console.log(data);
    swal.fire("success!", "Registration successfull", "success");
  }

  setUserPatient() {
    this.user_type = "patient";
  }
  setUserCompany() {
    this.user_type = "company";
  }
  setUserDoctor() {
    this.user_type = "doctor";
  }
  showAgree() {
    this.agree = !this.agree;
  }
  sendResetLink() {}
  signupWithGoogle() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        if (user) {
          let u = {
            name: user.name,
            id: user.id,
            email: user.email,
            image: user.photoUrl,
            method: 2,
          };
          //save user data in DB if not there
          this.authLocal.saveUser(JSON.stringify(u));
          // this.router.navigate(["/patient/dashboard"]);
        } else {
          swal.fire("Error", "Google Authentication Failed !", "error");
        }
      })
      .catch((err) => {
        swal.fire("Error!", "Login Failed", "error");
      });
  }

  signupWithFacebook() {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        if (user) {
          let u = {
            name: user.name,
            id: user.id,
            email: user.email,
            image: user.photoUrl,
            method: 3,
          };
          //save user data in DB if not there
          this.authLocal.saveUser(JSON.stringify(u));
          // this.router.navigate(["/patient/dashboard"]);
        } else {
          swal.fire("Error", "Google Authentication Failed !", "error");
        }
      })
      .catch((err) => {
        swal.fire("Error!", "Login Failed", "error");
      });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: "./dialog-content-example-dialog",
  templateUrl: "./terms-condition-dialog.html",
})
export class DialogContentExampleDialog {}
