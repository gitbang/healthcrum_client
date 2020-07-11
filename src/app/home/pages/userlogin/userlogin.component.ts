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
import {HomeServiceService} from '../../home-service.service'
// import * as $ from "bootstrap";
@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.scss"],
})
export class UserloginComponent implements OnInit {
  google = faGooglePlusG;
  fb = faFacebookSquare;

  flipDiv : boolean = false

  user_email: String;
  user_pass: String;
  forgot_email: string;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private authLocal: AuthServiceLocal,
    private router: Router,
    private service : HomeServiceService
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
    
    // delete the following line when data start storing in database
    // save the data in local storage which comes after login verified
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

  completeData : any;
  loginLocal(): void {
    
    let data = {
      username: this.user_email,
      password: this.user_pass,
    };

    this.authLocal.loginUser(data).subscribe((data) => {
       console.log("local response",data)
       if(data.success) {
        this.completeData = data        // contains : loginToken , success , userDetail 

        // fetch token and role  from the userDetail and store in local storage
          if(data.userDetail.isEmailVerified || data.userDetail.isPhoneVerified){
            console.log("one method is verified")
          } else {
            this.flip();
            this.userMobile = data.userDetail.phone;
            this.userEmail = data.userDetail.email;
          }
        } else {
         alert("Something")
       }
      }
    );
  }



  // verificational portal

  flip(){
    this.flipDiv = !this.flipDiv;
  }

  userMobile : number ;
  userEmail : string;
  bynumber : boolean = true;
  otpSend : boolean = false;
  verifyByNumber(){
    this.bynumber = true;
    this.otpSend = false
  }
  verifyByEmail(){
    this.bynumber = false;
    this.otpSend = false
  }


  sendOTP(){

    if(this.bynumber) {
      this.generateotp({phone : this.userMobile})
    } else {
      // send link to the otp
    }
  } 


  generateotp(data){
    
    this.service.consultationBookOtpcheck(data)
      .subscribe((result)=>{
        console.log(result)
        if(result.success) {
          this.otpSend = true;
          this.flip();
          swal.fire({
            icon: 'success',
            title: 'OTP send',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        } else {
          alert("something went wrong")
        }
      })
  }

  myotp : number;
  verify(){
    var toSend = {
      otp : this.myotp,
      phone : this.userMobile
    }
    var _this = this
    this.service.consultationChekOTP(toSend).subscribe((result)=>{
     // this.loading = false;
      console.log(result)
      if(result.success){
        _this.router.navigateByUrl('/patient')    
      } else{
        alert("OTP did not match")
      }
    })
  }
}
