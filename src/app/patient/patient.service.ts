import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  constructor(private http: HttpClient) {}
  // url: String = "http://localhost:3000";
  url: String = "https://api.sftservices.com";

  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  options = { headers: this.headers };

  getQuestions(category: string) {
    return this.http.post(
      this.url + "fetchquestion",
      { category },
      this.options
    );
  }
  getCovidAnswers(data:any) {
    return this.http.post(
      this.url + "/api/covid-answer/get-by-empid",
      data,
      this.options
    );
  }
  saveAns(ans) {
    return this.http.post(this.url + "/usersave", ans);
  }

  saveTemperature(data): Observable<any> {
    return this.http.post<any>(
      this.url + "/api/temperature/save",
      data,
      this.options
    );
  }
  saveCovidAnswers(data): Observable<any> {
    return this.http.post<any>(
      this.url + "/api/covid-answer/save",
      data,
      this.options
    );
  }
  saveCovidWeeklyAnswers(data): Observable<any> {
    return this.http.post<any>(
      this.url + "/api/covid-answer/save-weekly-ans",
      data,
      this.options
    );
  }
  getTemperatures(data): Observable<any> {
    return this.http.post<any>(
      this.url + "/api/temperature/get-all",
      data,
      this.options
    );
  }

  getEmpTemperature(data): Observable<any> {
    return this.http.post<any>(
      this.url + "/api/temperature/get-by-empid",
      data,
      this.options
    );
  }
  getCovidInitialQuestion(){
    return this.http
    .get<any>(
      this.url + "/dummy/data",
      this.options
    );
  }
  getWeeklyQuestion(){
    return this.http
    .get<any>(
      this.url + "/dummy/weekly-data",
      this.options
    );
  }
  needToAskQuestion(data){
    return this.http.post<any>(
      this.url + "/api/covid-answer/weekly/has-answered",
      data,
      this.options
    );
  }
  getWeeklySettings(){
    return this.http
    .get<any>(
      this.url + "/api/weekly-question/get",
      this.options
    );
  }
}
