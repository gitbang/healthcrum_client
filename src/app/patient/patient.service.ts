import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  constructor(private http: HttpClient) {}
  url: String = "http://localhost:3000/question/";

  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  options = { headers: this.headers };

  getQuestions(category: string) {
    console.log(category);
    console.log("service reached");
    return this.http.post(
      this.url + "fetchquestion",
      { category },
      this.options
    );
  }
  saveAns(ans) {
    console.log("reached");
    console.log(ans);
    return this.http.post("http://localhost:3000/usersave", ans);
  }
}
