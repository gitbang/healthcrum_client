import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import {
  Location
} from "@angular/common";
import "rxjs/add/operator/filter";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FormControl, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { HttpClient } from "@angular/common/http";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  BASE_URL:string = "https://api.sftservices.com";
  facog = faHospital;
  isLoggedIn = false;
  adminId = new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]) ;
  matcher = new MyErrorStateMatcher();
  hide = true;
  login_ip:string;
  error:boolean = false;
  message:string = "";
  checking:boolean = true;
  constructor(public location: Location, private router: Router,private httpClient:HttpClient) {}

  ngOnInit() {
    if(!this.isLoggedIn){
      this.checkLogin();
    }
    this.getUserIP();
  }
  
  isMaps(path) {   
      return false;
  }

  login(){
    if(this.adminId.value == null || this.adminId.value == "") return;
    if(this.password.value == null || this.password.value == "") return;
    const data = {login_ip: this.login_ip,admin_id:this.adminId.value, password:this.password.value};
    this.httpClient.post(this.BASE_URL+"/api/admin/login",data).subscribe((res:any)=>{
     console.log(res);
     if(res.success){
       localStorage.setItem('logged_in_ip',res.data.login_ip);
       localStorage.setItem('id',res.data.id.split('@')[0]);
       localStorage.setItem('passcode',res.data.id.split('@')[1]);
       localStorage.setItem('role',res.data.admin_role);
       this.isLoggedIn = true;
     }else{
       this.message = res.message;
       this.error = true;
       setTimeout(()=>{
         this.error = false;
         this.message = "";
       },8000);
     }
   })
  }
  checkLogin(){
    this.checking = true;
    const data = {login_ip: localStorage.getItem('logged_in_ip'),id: localStorage.getItem('id') + '@'+localStorage.getItem('passcode')};
    this.httpClient.post(this.BASE_URL+"/api/admin/login-check",data).subscribe((res:any)=>{
      this.checking = false;
     if(res.success){
       this.isLoggedIn = true;
     }else{
       this.isLoggedIn = false;
     }
   })
  }

  getUserIP(){
    const url = "https://api.ipify.org?format=json";
    this.httpClient.get(url).subscribe((res:any)=>{
      this.login_ip = res.ip;
    })
  }

  closeError(){
    this.error = false;
    this.message = "";
  }

}
