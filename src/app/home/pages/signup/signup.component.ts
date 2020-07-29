import { Component, OnInit, HostListener } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
import { EventManager } from "@angular/platform-browser";
import { SocialDetailsComponent } from "./social-details/social-details.component";
import { HomeServiceService } from "app/home/home-service.service";

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

  user_email: String = "";
  user_pass: String;
  user_name: String;
  user_cpass: String;
  user_mob: String;
  user_type: String;
  user_gender: String = "none";
  agree = false;
  employeeId : String;
  companyId :String
  branchId :String
  departmentId :String

  corporates:any[] = [];
  branches:any[] = [];
  departments:any[] = [];

  data : any;
  // save To db ;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private authLocal: AuthServiceLocal,
    private homeService: HomeServiceService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // $(document).ready(() => {});
  }

  fromGoogle : any;
  social : boolean = false;
  maxDate : Date
  ngOnInit() { 
    this.maxDate = new Date()
    this.getCorporates(); 
    let isLoggin = this.authLocal.isLoggin();
    if(isLoggin){
      let role = this.authLocal.getUserRole();
      this.dynamicRouting(role)
    }

  }

  dynamicRouting(role) {
    if(role == "doctor") {
      this.router.navigateByUrl('/doctor')
    } else {
      this.router.navigateByUrl('/patient');
    } 
  }
  loading : boolean = false;
  signupUser(): void {
    var data;

    if (this.user_name == "" || this.user_name == undefined) {
      swal.fire("Please enter your full name");
      return;
    }
    // if (this.user_email == "" || this.user_email == undefined) {
    //   swal.fire("Please enter your email address");
    //   return;
    // }
    if (this.user_mob == "" || this.user_mob == undefined ||
       this.user_mob.toString().length != 10) {
      swal.fire("Please enter Valid Phone Number");
      return;
    }
    if (this.user_gender == "none" || this.user_gender == undefined) {
      swal.fire("Please select your gender");
      return;
    }
    if(!this.social) {
      this.data = 'local'
      if (this.user_pass == "" || this.user_pass == undefined) {
        swal.fire("Please enter password for account");
        return;
      }
      if (this.user_cpass == "" || this.user_cpass == undefined) {
        swal.fire("Please confirm password");
        return;
      }
      if (this.user_pass != this.user_cpass) {
        swal.fire("password doesn't matches");
        return;
      }
    } 

    if (!this.user_type) {
      swal.fire("Please choose user type");
      return;
    }
    if (!this.agree) {
      swal.fire("please accept terms and conditions");
      return;
    }
    
    if(this.user_type == 'employee'){
      if(!this.employeeId){
        swal.fire("please enter employeeId");
        return
      }
      if(!this.companyId){
        swal.fire("please enter companyId");
        return
      }
      if(!this.branchId){
        swal.fire("please enter branchId");
        return
      }
      if(!this.departmentId){
        swal.fire("please enter departmentId");
        return
      }
      data = {
        name: this.user_name,
        email: this.user_email.length > 1 ? this.user_email : "",
        password: this.user_pass,
        phone: this.user_mob,
        gender: this.user_gender,
        role: this.user_type,
        employeeId : this.employeeId,
        companyName : this.companyId,
        branchName : this.branchId,
        departmentName : this.departmentId,
        method : this.data
      };
      

    } else {
      data = {
        name: this.user_name,
        email: this.user_email,
        password: this.user_pass,
        phone: this.user_mob,
        gender: this.user_gender,
        role: this.user_type,
        method : this.data
      };
    }
    if(this.user_email == undefined || this.user_email == null || this.user_email.length == 0 ){
      delete data.email
    }
    
    console.log("final data :" , data)
    this.loading = true;
    this.authLocal.signUpUser(data).subscribe((result)=>{
      this.loading = false;
      if(result.success){
        swal.fire("success!", "Registration successfull", "success");
        this.router.navigateByUrl('/login')
      } else {
        console.log(result)
        swal.fire(result.message)
      }
    })
  }

  setUserType(type : string) {
    this.user_type = type
  }

  selectGender(event){
    console.log("in gender", event)
    this.user_gender = event
  }

  showAgree() {
    this.agree = !this.agree;
  }
  
  signupWithGoogle() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        console.log("complete user", user)
        if (user) {
          let u = {
            name: user.name,
            id: user.id,
            email: user.email,
            image: user.photoUrl,
            method: 2,
          };
          this.data = "google"
          this.social = true
          this.fromGoogle = user
          this.user_name = user.name;
          this.user_email = user.email;
          this.user_pass = user.id

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
          this.data = "facebook"
          this.social = true
          this.fromGoogle = user
          this.user_name = user.name;
          this.user_email = user.email;
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
      this.agree = (result === 'true')
      console.log(this.agree)
    });
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    //this.authService.signOut();
  }

  getCorporates(){
    this.homeService.getAllCorporate().subscribe((res:any)=>{
      console.log(res);
      if(res.success){
        this.corporates = res.data;
      }
    })
  }
  getCompantBranches(){
    let data = { corporate_id : this.companyId};
    this.homeService.getBranchesByCorporate(data).subscribe((res:any)=>{
      if(res.success){
        this.branches = res.data;
      }
    });
  }
  getDepartments(){
    let data = { corporate_id : this.companyId, branch_id: this.branchId};
    this.homeService.getDepartmentByCorporate(data).subscribe((res:any)=>{
      if(res.success){
        this.departments = res.data;
      }
    });
  }
}

@Component({
  selector: "./dialog-content-example-dialog",
  templateUrl: "./terms-condition-dialog.html",
})
export class DialogContentExampleDialog {}
