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
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { HomeServiceService } from "../../home-service.service";
// import * as $ from "bootstrap";
// declare var $ : any
@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.scss"],
})
export class UserloginComponent implements OnInit {
  google = faGooglePlusG;
  fb = faFacebookSquare;

  flipDiv: boolean = false;
  forgotPass: boolean;
  user_email: String;
  user_pass: String;
  forgot_email: string;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private authLocal: AuthServiceLocal,
    private router: Router,
    private service: HomeServiceService
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

  ngOnInit() {
    let isLoggin = this.authLocal.isLoggin();
    console.log("is login ", isLoggin);
    if (isLoggin) {
      let role = this.authLocal.getUserRole();
      this.dynamicRouting(role);
    }

    // let data = this.authLocal.getUserDetails()
    // console.log("details", data)
  }

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        if (user) {
          this.afterSocialLogin(user);
        } else {
          Swal.fire("Error", "Google Authentication Failed !", "error");
        }
      })
      .catch((err) => {
        Swal.fire("Error!", "Login Failed", "error");
      });
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        if (user) {
          this.afterSocialLogin(user);
        } else {
          Swal.fire("Error", "Facebook Authentication Failed !", "error");
        }
      })
      .catch((err) => {
        Swal.fire("Error!", "Login Failed", "error");
      });
  }

  afterSocialLogin(user) {
    console.log(user);
    let u = {
      name: user.name,
      id: user.id,
      image: user.photoUrl,
    };

    this.authLocal.saveUser(JSON.stringify(u));

    let data = { username: user.email, password: user.id }
    this.userDetail = data
    this.sendRequestToCheckLogin(data)
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
    Swal.fire("Success!", "Email sent successfully !", "success");
  }
  userDetail ;
  completeData: any;
  hasEmail : boolean ;
  isPhoneVerified : boolean = false;
  isEmailVerifies : boolean = false;

  loginLocal(): void {
    this.forgotPass = false;
    if (!this.user_email) {
      Swal.fire("Id required");
      return;
    }
    if (!this.user_pass) {
      Swal.fire("Password required");
      return;
    }

    let data = {
      username: this.user_email,
      password: this.user_pass,
    };
    this.userDetail = data
    this.sendRequestToCheckLogin(data)
  }

  sendRequestToCheckLogin(data){
    this.authLocal.loginUser(data).subscribe((data) => {
      console.log("local response", data);
      if (data.success) {
        this.completeData = data;

        if(!data.userDetail.email || data.userDetail.email == null ||  data.userDetail.email == undefined){
          this.hasEmail = false
          console.log("no email")
          if(data.userDetail.isPhoneVerified) {
            this.isPhoneVerified = true;
            this.userMobile = data.userDetail.phone;
            this.saveAndAccess()
          } else {
            Swal.fire({
              title : "Please verify phone number to proceed",
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            }
            )
            this.userMobile = data.userDetail.phone;
            this.flip();
          }
        } else if ( data.userDetail.isEmailVerified && data.userDetail.isPhoneVerified ) {
          this.hasEmail = true;
          this.isPhoneVerified = true;
          this.isEmailVerifies = true;
          console.log("Both method is verified");
          // call the method which leads to dashboard
          this.saveAndAccess();
        } else{                   // user have both , but any one or both are  not verified
          this.hasEmail = true
          this.userMobile = data.userDetail.phone;
          this.userEmail = data.userDetail.email;

          if(!data.userDetail.isEmailVerified && !data.userDetail.isPhoneVerified ) {
            this.isEmailVerifies = false;
            this.isPhoneVerified = false;
            Swal.fire({
              title : "Please verify your mobile number to proceed",
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
          }).then(ok=>{
              this.flipDiv = true;
            })
            this.resetVariables()
           
          } else if(!data.userDetail.isEmailVerified){
            this.isEmailVerifies = false;
            this.isPhoneVerified = true;
            this.bynumber = false
            
            this.resetVariables()
            Swal.fire({
              title : "Please verify your email to proceed", 
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
          }).then(ok=>{
              this.flipDiv = true;
            })
          } else {
            this.bynumber = true;
            this.isEmailVerifies = true;
            this.isPhoneVerified = false;
            Swal.fire({
              title : "Please verify your mobile number to proceed",
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            }).then(ok=>{
              this.flipDiv = true;
            })
            this.resetVariables()
          }
        }
      } else {
        console.log("something went wrong")
        Swal.fire(data.message);
      }
    });
  }

  SwalCustom(toverify) {
    Swal.fire({
      title : `Please verify your ${toverify} to proceed`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
      }).then(ok=>{
          this.flipDiv = true;
      })
  }

  flip() {
    this.otpSend = false;
    this.otpConfirmed = false;
    this.flipDiv = !this.flipDiv;
  }
  resetVariables(){
    this.otpSend = false;
    this.otpConfirmed = false;
  }

  userMobile: number;
  userEmail: string;
  bynumber: boolean = true;
  otpSend: boolean = false;

  verifyByNumber() {
    if (!this.bynumber) {
      this.bynumber = true;
      this.otpSend = false;
    }
  }
  verifyByEmail() {
    if (this.bynumber) {
      this.bynumber = false;
      this.otpSend = false;
    }
  }

  saveAndAccess() {
    
    let role = this.completeData.role;
    
    if(role != 'patient') {
      if(this.completeData.approvedUser) {
       
        this.dynamicRouting(this.completeData.role)
      } else {
        Swal.fire({title : `Your phone number and email bith are verified now.
         Admin will approve your account then you will able to login. Thanks`,
         showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
        })
      }
    } else{
      console.log("role is : ", role);
     
      this.dynamicRouting(role);
    }
  }

  dynamicRouting(role) {
    this.authLocal.saveTokenAndRole(this.completeData.userDetail);
    this.authLocal.saveUserToken(this.completeData.loginToken);
    const url = this.authLocal.redirectUrl
    if(url != false && url != null ) {
      this.router.navigateByUrl(url)
      this.authLocal.deleteRedirectUrl()
    } else {
      if (role == "doctor") {
        this.router.navigateByUrl("/doctor");
      } else {
        this.router.navigateByUrl("/patient");
      }
    }
  }

  sendOTP() {
    var data;
    if (this.forgotPass) {
      if (this.bynumber) {
        if (this.forgotMobile.toString().length != 10) {
          Swal.fire("Enter valid phone number");
          return;
        }
        data = {
          username: this.forgotMobile,
        };
      } else {
        if (this.forgotEmail.length == 0) {
          Swal.fire("Enter valid email");
          return;
        }
        data = {
          username: this.forgotEmail,
          forgotPassword: this.forgotPass,
        };
      }
      this.authLocal.loginForgotPasswordOtp(data).subscribe((result) => {
        console.log(result);
        this.alertOfOtpSend();
        this.otpSend = true;
      });
    } else {
      if (this.bynumber) {
        data = {
          username: this.userMobile.toString(),
        };
      } else {
        data = {
          username: this.userEmail,
          //forgotPassword: this.forgotPass,
        };
      }
      this.generateotp(data);
    }
  }

  alertOfOtpSend() {
    Swal.fire({
      icon: "success",
      title: "OTP send",
      showConfirmButton: false,
      timer: 1500,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }

  generateotp(data) {
    console.log(data);
    this.authLocal
      .loginOtpSend(data) //  route changes as to verify otp
      .subscribe((result) => {
        console.log(result);
        if (result.success) {
          this.alertOfOtpSend();
          this.otpSend = true;
        } else {
          Swal.fire("Error", result.message, "error");
        }
      });
  }

  myotp: number;

  verify() {
    var toSend;
    if (this.forgotPass) {
      if (this.bynumber) {
        toSend = {
          otp: this.myotp,
          phone: this.forgotMobile,
        };
        console.log("enter verify otp");
        var _this = this;
        this.service.consultationChekOTP(toSend).subscribe((result) => {
          if (result.success) {
            this.otpConfirmed = true;
          } else {
            Swal.fire("Error", result.message, "error");
          }
        });
      } else {
        toSend = {
          otp: this.myotp,
          username: this.forgotEmail,
        };

        this.authLocal.verifyOtpOfEmail(toSend).subscribe((result) => {
          console.log("email verify : ", result);
          if (result.success) {
            console.log("entered");
            this.otpConfirmed = true;
          }
          console.log("otp confirmed ", this.otpConfirmed);
        });
      }
    } else {
      if (this.bynumber) {
        toSend = {
          otp: this.myotp.toString(),
          phone: this.userMobile.toString(),
        };

        this.service.consultationChekOTP(toSend).subscribe((result) => {
          console.log(result);
          if (result.success) {
            console.log("otp verified ", result);
            //this.saveAndAccess(); // for dynamic routing
            this.sendRequestToCheckLogin(this.userDetail)
          } else {
            Swal.fire("Error", result.message, "error");
          }
        });
      } else {
        // verify otp through email
        toSend = {
          otp: this.myotp,
          username: this.userEmail,
        };
        // this.verifyOtpOfEmail(toSend);
        this.authLocal.verifyOtpOfEmail(toSend).subscribe((result) => {
          if (result.success) {
            if (result.isEmailVerified) {
              this.sendRequestToCheckLogin(this.userDetail)
              //this.saveAndAccess();
            } else {
              Swal.fire("Error", result.message, "error");
            }
          } else {
            Swal.fire("Error", result.message, "error");
          }
        });
      }
      console.log("user details are : ", this.userDetail)
      
      var _this = this;
    }
  }
  // password change portal

  forgotMobile: number;
  forgotEmail: string;
  otpConfirmed: boolean = false;
  forgetpass() {
    this.forgotPass = true;
    this.flip();
  }

  newPassword: number;
  newPasswordConfirm: number;
  changePassword() {
    if (!this.newPassword) {
      Swal.fire("Enter password");
      return;
    }
    if (!this.newPasswordConfirm) {
      Swal.fire("Confirm password");
      return;
    }
    if (this.newPassword !== this.newPasswordConfirm) {
      Swal.fire("Password not matched");
      return;
    }
    var data;
    if (this.bynumber) {
      data = {
        username: this.forgotMobile,
        password: this.newPassword,
      };
    } else {
      data = {
        username: this.forgotEmail,
        password: this.newPassword,
      };
    }

    console.log("data to change password is", data);

    this.authLocal.loginUpdatePassword(data).subscribe((result) => {
      if (result.success) {
        Swal.fire("Password update");
        //this.router.navigateByUrl('/login')
        this.forgotEmail = "";
        this.forgotPass = false;
        (this.forgotEmail = ""), (this.forgotMobile = null);
        this.flip();
      }
    });
  }
}
