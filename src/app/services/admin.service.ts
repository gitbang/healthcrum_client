import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  url: String = "http://localhost:3000/tests/";
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    "Content-Type": "application/json"
  });
  options = { headers: this.headers };

  getTestList(): Observable<any> {
    return this.http
      .get<any>(this.url + "indvidualtest")
      .pipe(catchError(this.handleError<any>("getTestList", {})));
  }
  getProfileTest(): Observable<any> {
    return this.http
      .get<any>(this.url + "profiletest")
      .pipe(catchError(this.handleError<any>("getProfileTestList", {})));
  }

  getPackages(): Observable<any> {
    return this.http
      .get<any>(this.url + "packagetest")
      .pipe(catchError(this.handleError<any>("getProfileTestList", {})));
  }

  saveSingleTest(data: any): Observable<any> {
    return this.http
      .post<any>(this.url + "indvidualtest", data, this.options)
      .pipe(catchError(this.handleError<any>("saveSingleTest", {})));
  }

  saveProfileTest(data: any): Observable<any> {
    return this.http
      .post<any>(this.url + "profiletest", data, this.options)
      .pipe(catchError(this.handleError<any>("saveProfileTest", {})));
  }
  savePackage(data):Observable<any> {
    return this.http
      .post<any>(this.url + "packagetest", data, this.options)
      .pipe(catchError(this.handleError<any>("saveProfileTest", {})));
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
