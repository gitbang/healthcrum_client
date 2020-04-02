import { Injectable } from "@angular/core";
import { AuthService, SocialUser } from "angularx-social-login";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthServiceLocal {
  constructor(private http: HttpClient) {}

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

  baseurl: string = "http://localhost:5000/users/";

  loginUser(data, headers) {
    return this.http.post(this.baseurl + "signin", data, headers);
    // .pipe(map((res: Response) => res.json()));
  }
}
