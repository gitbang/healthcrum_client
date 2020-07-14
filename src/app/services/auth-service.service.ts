import { Injectable } from "@angular/core";
import { AuthService, SocialUser } from "angularx-social-login";
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

  baseurl: string = 'http://localhost:3000';

  get isUserLoggedIn(): boolean {
    let user = localStorage.getItem("user");
    if (!user) {
      return false;
    } else {
      return true;
    }
  }

  get getUserData() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      return null;
    }
  }

  saveUser(user) {
    localStorage.setItem("user", user);
  }

  logoutUser() {
    localStorage.removeItem("user");
  }

  signUpUser(data) : Observable<any>{
    return this.http
            .post(this.baseurl + "/api//user/sign-up", data, this.option)
            .pipe(retry(2), catchError(this.handleError))
  }

  loginUser(data) : Observable<any> {
    return this.http.post(this.baseurl + "/api//user/login", data, this.option)
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
  
      let data =  localStorage.getItem('userDetail');
      console.log("data in user details" , JSON.parse(data) )
      return JSON.parse(data)
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
      console.log("local storage data is : ", data)
      return data.role
    } catch(error){
      return null
    }
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
