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
//declare var $ : any
@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.scss"],
})
export class UserloginComponent implements OnInit {
  google = faGooglePlusG;
  fb = faFacebookSquare;

  flipDiv : boolean = false
  forgotPass : boolean;
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

  ngOnInit() {

    let data = this.authLocal.getUserDetails()
    console.log("details", data)
  }

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
    console.log(user)
    let u = {
      name: user.name,
      id: user.id,
      image: user.photoUrl,
    };
    
    this.authLocal.saveUser(JSON.stringify(u));

    this.authLocal.loginUser({username : user.email, password : user.id})
      .subscribe((response)=>{
        console.log("response after user login save",response)

        if(response.success){
         console.log("data save ")
         this.completeData = response
         console.log(this.completeData)
         this.saveAndAccess()
        } else {
          swal.fire("Email not found")
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
    swal.fire("Success!", "Email sent successfully !", "success");
  }

  completeData : any;

  loginLocal(): void {
    this.forgotPass = false
    if(!this.user_email) {
      swal.fire("Id required")
      return
    }
    if(!this.user_pass) {
      swal.fire("Password required")
      return
    }

    let data = {
      username: this.user_email,
      password: this.user_pass,
    };

    this.authLocal.loginUser(data).subscribe((data) => {
       console.log("local response",data)
      if(data.success) {
        this.completeData = data        

        if(data.userDetail.isEmailVerified || data.userDetail.isPhoneVerified){
          
          console.log("one method is verified");
          this.saveAndAccess();
        } else {

          this.userMobile = data.userDetail.phone;
          this.userEmail = data.userDetail.email;
          this.flip();
        }
      } else {
        alert("No data found")
      }
    });
  }

  flip(){
    this.otpSend = false;
    this.otpConfirmed = false;
    this.flipDiv = !this.flipDiv;
  }

  userMobile : number ;
  userEmail : string;
  bynumber : boolean = true;
  otpSend : boolean = false;

  verifyByNumber(){
    if(!this.bynumber){
      this.bynumber = true;
      this.otpSend = false;
    }
  }
  verifyByEmail(){
    if(this.bynumber) {
      this.bynumber = false;
      this.otpSend = false;
    }
  }

  saveAndAccess(){
    this.authLocal.saveTokenAndRole(this.completeData.userDetail)    
    let role = this.authLocal.getUserRole();
    console.log("role is : ", role )
    if(role == "doctor") {
      this.router.navigateByUrl('/doctor')
    } else {
      this.router.navigateByUrl('/patient');
    } 
    
  }
  
  sendOTP(){
    var data;
    if(this.forgotPass) {
      if(this.bynumber) {
        if(this.forgotMobile.toString().length != 10) {
          swal.fire("Enter valid phone number")
          return
        }
        data = {
          username : this.forgotMobile
        }
      } else {
        if(this.forgotEmail.length == 0) {
          swal.fire("Enter valid email")
          return
        }
        data = {
          username : this.forgotEmail,
          forgotPassword : this.forgotPass
        }
      }
      this.authLocal.loginForgotPasswordOtp(data).subscribe((result)=>{
        console.log(result)
        this.alertOfOtpSend();
        this.otpSend = true
      })
    } else {        
      
      if(this.bynumber) { 
        data = {
          username : this.userMobile
        }
      } else {
         data = {
          username : this.userEmail,   
          forgotPassword : this.forgotPass
        }
      }
      this.generateotp(data)
    } 
  } 

  alertOfOtpSend(){
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
  }

  generateotp(data){
    console.log(data)
    this.authLocal.loginOtpSend(data)      //  route changes as to verify otp
      .subscribe((result)=>{
        console.log(result)
        if(result.success) {
          this.alertOfOtpSend();
          this.otpSend = true;
        } else {
          swal.fire("Error",result.message,"error");
        }
      })
  }

  myotp : number;

  verify(){
    var toSend;
    if(this.forgotPass){
      if(this.bynumber) {
        toSend = {
          otp : this.myotp,
          phone : this.forgotMobile
        }
        console.log("enter verify otp")
        var _this = this
        this.service.consultationChekOTP(toSend).subscribe((result)=>{
          if(result.success){
            this.otpConfirmed = true
          } else{
            swal.fire("Error",result.message,"error");
          }
        })
      } else {
        toSend = {
          otp : this.myotp,
          username : this.forgotEmail
        }

        this.authLocal.verifyOtpOfEmail(toSend).subscribe((result)=>{
          console.log("email verify : ", result)
          if(result.success) {
            console.log("entered")
            this.otpConfirmed = true;

          }
          console.log("otp confirmed ", this.otpConfirmed)
        })
      }
    
    } else {

      if(this.bynumber) {
        toSend = {
          otp : this.myotp,
          phone : this.userMobile
        }

        this.service.consultationChekOTP(toSend).subscribe((result)=>{
          console.log(result)
          if(result.success){
            console.log("otp verified ", result)
            this.saveAndAccess();                         // for dynamic routing
          } else{
            swal.fire("Error",result.message,"error");
          }
        })
      } else {
        // verify otp through email
        toSend = {
          otp : this.myotp,
          username : this.userEmail
        }
       // this.verifyOtpOfEmail(toSend);
        this.authLocal.verifyOtpOfEmail(toSend).subscribe(result=>{
          if(result.success) {
            if(result.isEmailVerified){
              this.saveAndAccess();
            } else {
              swal.fire("Error",result.message,"error");
            }
          } else {
            swal.fire("Error",result.message,"error");
          }
        })
      }

      var _this = this
    }  
  }

  verifyOtpOfEmail(data) {
    this.authLocal.verifyOtpOfEmail(data).subscribe(result=>{
      if(result.success) {
        if(result.isEmailVerified){
          this.saveAndAccess();
        } else {
          swal.fire("Error",result.message,"error");
        }
      } else {
        swal.fire("Error",result.message,"error");
      }
    })
  }

  forgotMobile : number; 
  forgotEmail : string;
  otpConfirmed : boolean = false
  forgetpass(){
    this.forgotPass = true
    this.flip()
  }

  newPassword : number;
  newPasswordConfirm : number
  changePassword(){

    if(!this.newPassword){
      swal.fire("Enter password")
      return
    }
    if(!this.newPasswordConfirm){
      swal.fire('Confirm password')
      return
    }
    if(this.newPassword !== this.newPasswordConfirm){
      swal.fire("Password not matched")
      return
    }
    var data;
    if(this.bynumber){
      data = {
        username : this.forgotMobile ,
        password : this.newPassword
      }
    } else {
      data = {
        username : this.forgotEmail ,
        password : this.newPassword
      }
    }
    
    console.log("data to change password is", data)

    this.authLocal.loginUpdatePassword(data).subscribe((result)=>{
      if(result.success){
        swal.fire("Password update")
        //this.router.navigateByUrl('/login')
        this.forgotEmail = "";
        this.forgotPass = false;
        this.forgotEmail = "",
        this.forgotMobile = null
        this.flip()
      }
    })

  }
}
