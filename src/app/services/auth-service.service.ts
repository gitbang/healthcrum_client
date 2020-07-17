import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class AuthServiceLocal {
 
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  option = { headers: this.headers };

  // baseurl: string = 'http://localhost:3000';
  baseurl: String = "https://api.sftservices.com";

  get isUserLoggedIn(): boolean {
    let user = JSON.parse(localStorage.getItem("userDetail"));
    if (!user) {
      return false;
    } else {
      return true;
    }
  }

  saveUser(user) {
    localStorage.setItem("userDetail", user);
  }

  logoutUser() {
    try{
      localStorage.removeItem("user");
      localStorage.removeItem("userDetail");
      localStorage.removeItem("token");
    }catch(err){

    }
  }
  signUpUser(data) : Observable<any>{
    return this.http
            .post(this.baseurl + "/api/user/sign-up", data, this.option)
            .pipe(retry(2), catchError(this.handleError))
  }

  loginUser(data) : Observable<any> {
    return this.http.post(this.baseurl + "/api/user/login", data, this.option)
              .pipe(retry(2), catchError(this.handleError))
  }

  saveTokenAndRole(userDetail){
    try {
      localStorage.removeItem("userDetail");
      userDetail = JSON.stringify(userDetail)
      localStorage.setItem("userDetail", userDetail)  
    } catch (error) {
      return alert(error)
    }
  }

  getUserDetails(){
      return this.getUserData;
  }

  get getUserData(){
    try {
      return JSON.parse(localStorage.getItem('userDetail'));
    } catch(error){
      return null
    }
  }
  getUserId(){
    try{
      let data = JSON.parse(localStorage.getItem('userDetail'));
      return data.userId
    } catch(error){
      return null
    }
  }

  isLoggin(){
    let user = JSON.parse(localStorage.getItem('userDetail'));
    if (!user) {
      return false;
    } else {
      return true;
    }
  }

  getUserRole(){
    try{
      let data = JSON.parse(localStorage.getItem('userDetail'));
      return data.role
    } catch(error){
      return null
    }
  }

  loginOtpSend(data : any) :Observable <any> {
    return this.http
            .post(this.baseurl + "/api/user/login/verification", data, this.option)
            .pipe(retry(2), catchError(this.handleError))
  }

  verifyOtpOfPhone(data : any) :Observable <any> {
    return this.http
            .post(this.baseurl + "/verifyotp", data, this.option)
            .pipe(retry(2), catchError(this.handleError))
  }

  verifyOtpOfEmail(data : any) :Observable <any> {
    return this.http
            .post(this.baseurl + "/api/user/login/verification/email", data, this.option)
            .pipe(retry(2), catchError(this.handleError))
  }

  retryOtpToEmail(data : any) : Observable<any>{
    return this.http
            .post(this.baseurl + "/api/user/login/verification/retryOtpEmail", data, this.option)
            .pipe(retry(2), catchError(this.handleError))
  }

  get getUserID(){
    return JSON.parse(localStorage.getItem("userDetail")).userId;
  }
 get getUserHealthcrumID(){
    return JSON.parse(localStorage.getItem("userDetail")).healthcrumId;
  }

  get getUserCorporateID(){
    return JSON.parse(localStorage.getItem("userDetail")).companyId;
  }

 get getUserBranchID(){
    return JSON.parse(localStorage.getItem("userDetail")).branchId;
  }

 get getUserDepartmentID(){
    return JSON.parse(localStorage.getItem("userDetail")).departmentId;
  }

  get getUserEmployeeID(){
    return JSON.parse(localStorage.getItem("userDetail")).employeeId;
  }

  saveUserToken(token){
    try{
        localStorage.setItem("token",token);
    }catch(err){

    }
  }

getUserToken(){
    return localStorage.getItem("token") ? localStorage.getItem("token") : "";
}

isLoggedIn(){
  return localStorage.getItem("token") ? true : false;
}
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
