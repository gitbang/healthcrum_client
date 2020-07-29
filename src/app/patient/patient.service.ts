import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  constructor(private http: HttpClient) {}
    url: String = "http://localhost:3000";
  //url: String = "https://api.sftservices.com";

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

  appointmentfetchAppointment(userId : string): Observable<any>{
    return this.http
      .get(this.url + "/payment/fetch-appointment/user/" + userId, this.options)
      .pipe(retry(2))
  }

  bloodTestFetchDetails(userId : string): Observable<any>{
    return this.http
            .get(this.url + "/fetch-bloodTest/user/" + userId, this.options)
            .pipe(retry(2), catchError(this.handleError))
  }

  ordersgetBloodTest(userId : string):Observable<any>{
    return this.http
            .get(this.url + '/payment/fetch-bloodTest/user/'+userId, this.options)
            .pipe(retry(2), catchError(this.handleError))
  }

  prescriptionGetall(userId : string):Observable<any>{
    return this.http
            .get(this.url + '/getUserPrescription/'+ userId, this.options)
            .pipe(retry(2), catchError(this.handleError))
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
