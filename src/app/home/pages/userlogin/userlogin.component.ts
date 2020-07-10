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
import { AuthService, SocialUser } from "angularx-social-login";
import { AuthServiceLocal } from "../../../services/auth-service.service";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "angularx-social-login";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import * as $ from "jquery";
// import * as $ from "bootstrap";
@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.scss"],
})
export class UserloginComponent implements OnInit {
  google = faGooglePlusG;
  fb = faFacebookSquare;

  user_email: String;
  user_pass: String;
  forgot_email: string;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private authLocal: AuthServiceLocal,
    private router: Router
  ) {
    // $(document).ready(() => {});
  }
  signInCallback(authResult) {
    if (authResult.code) {
      $.post("/auth/google/callback", { code: authResult.code }).done(function (
        data
      ) {
        $("#signinButton").hide();
      });
    } else if (authResult.error) {
      console.log("There was an error: " + authResult.error);
    }
  }

  ngOnInit() {}

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        if (user) {
          this.afterSocialLogin(user);
        } else {
          swal.fire("Error", "Google Authentication Failed !", "error");
        }
      })
      .catch((err) => {
        swal.fire("Error!", "Login Failed", "error");
      });
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(user=>{
        if(user) {
          this.afterSocialLogin(user)
        } else {
          swal.fire("Error", "Facebook Authentication Failed !", "error");
        }
      })
      .catch(err =>{
        swal.fire("Error!", "Login Failed", "error")
      })
  }

  afterSocialLogin(user) {
    let u = {
      name: user.name,
      id: user.id,
      image: user.photoUrl,
    };
    //save user data in DB if not there
    // delete the following line when data start storing in database
    this.authLocal.saveUser(JSON.stringify(u));
    this.authLocal.loginUser({username : user.name , password : user.id})
      .subscribe((response)=>{
        console.log("response after user login save",response)

        if(response.success){
         console.log("data save ")
        }
      })
  }
  
  signOut(): void {
    this.authService.signOut();
  }

  sendResetLink(): void {
    let data = {
      email: this.forgot_email,
      type: "reset-link",
    };
    this.forgot_email = "";
    // $("#forgotModal").hide();
    swal.fire("Success!", "Email sent successfully !", "success");
  }

  loginLocal(): void {
    
    let data = {
      email: this.user_email,
      password: this.user_pass,
    };

    this.authLocal.loginUser(data).subscribe(
      (data) => {
        // this.alertService.success('Registration successful', true);
        // this.router.navigate(["/patient/dashboard"]);
        // console.log(data);
      },
      (error: HttpErrorResponse) => {
        // let errorPayload = JSON.parse(error.message);
        //ToDo: apply your handling logic e.g.:
        // console.log(errorPayload);
        swal.fire("Error", "Wrong email or password", "error");
      }
    );
  }
}
