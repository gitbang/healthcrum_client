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

  saveTokenAndRole(token, role){
    localStorage.setItem("token", token)
    localStorage.setItem("role", role)
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
