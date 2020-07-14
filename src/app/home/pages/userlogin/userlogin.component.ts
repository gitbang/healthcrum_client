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
    
    // delete the following line when data start storing in database
    // save the data in local storage which comes after login verified
    this.authLocal.saveUser(JSON.stringify(u));

    this.authLocal.loginUser({username : user.email, password : user.id})
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
        this.completeData = data        // contains : loginToken , success , userDetail 
       
        this.authLocal.saveTokenAndRole(data.userDetail)    

        // code here to add dashboard dynamically
        let role = this.authLocal.getUserRole();
        console.log("role is : ", role )

        if(data.userDetail.isEmailVerified || data.userDetail.isPhoneVerified){

          this.forgotPass = false;
          this.flip();

          console.log("one method is verified")
        } else {
          this.forgotPass = false
          this.userMobile = data.userDetail.phone;
          this.userEmail = data.userDetail.email;
          this.flip();
        }
      } else {
        alert("No data found")
      }
    });
  }

  // verificational portal

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

  sendOTP(){
    this.otpSend = true
    /*
    if(this.forgotPass) {
      if(this.bynumber) {

        if(this.forgotMobile.toString().length != 10) {
          swal.fire("Enter valid phone number")
          return
        }

        console.log("send otp")
        this.generateotp({phone : this.forgotMobile})
      } else {
        if(this.forgotEmail.length > 1) {
          swal.fire("Enter valid email")
          return
        }
        // send link to the otp
        let email = this.forgotEmail
      }

    } else {        
      // if user want to verify the account by number
      if(this.bynumber) {
        console.log("send otp")
        let data = {
          input : this.userMobile,
          type : "phone",
          _id : this.completeData.userDetail.userId
        }
        this.generateotp(data)
      } else {
      // if user want to verify the account by email
        let data = {
          input : this.userEmail,
          type : "phone",
          _id : this.completeData.userDetail.userId
        }
        
        this.generateotp(data)
      }
    } */
  } 


  generateotp(data){
    console.log(data)
    this.service.consultationBookOtpcheck(data)
      .subscribe((result)=>{
        console.log(result)
        if(result.success) {
          this.otpSend = true;
          //this.flip();
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
    this.otpConfirmed = true
     /*
    if(this.forgotPass){
      var toSend = {
        otp : this.myotp,
        phone : this.forgotMobile
      }
      console.log("enter verify otp")
      var _this = this
      this.service.consultationChekOTP(toSend).subscribe((result)=>{
      
        console.log(result)

        if(result.success){

          this.otpConfirmed = true
          
        } else{

          alert("OTP did not match")

        }
      })
    
    } else {

      toSend = {
        otp : this.myotp,
        phone : this.userMobile
      }

      var _this = this
      this.service.consultationChekOTP(toSend).subscribe((result)=>{
      
        console.log(result)
        if(result.success){
          _this.router.navigateByUrl('/patient')    
        } else{
          alert("OTP did not match")
        }
      })
    }  */
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

    let data = {
      _id : "",
      password : this.newPassword
    }
    console.log("data to change password is", data)
  }
}
