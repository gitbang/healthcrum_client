import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http : HttpClient) { }
  
  url: String = "http://localhost:3000";
  
  // user id for temporary purpose
  userId = "5e8efa895b324a3e4c97a278";

  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  options = { headers: this.headers };

// e-prescription 
  submitFirstForm(form1) : Observable<any> {
    //console.log("reached first form");
    return this.http
        .post(this.url + '/saveprescriptionfirst/'+ this.userId, form1.value, this.options)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
  }
  submitSecondForm(form2) : Observable<any> {
   // console.log("reached secoond form");
    //console.log(form2.value);
    return this.http
        .post(this.url + '/saverecommendation/' + this.userId , form2.value, this.options)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
  }

  hradetails () : Observable<any> {
    console.log("this is hra details");
    return this.http.get('' )
  }
  reasonFromHra(reason) : Observable <any> {
    console.log("reason service reached");
    return this.http.post('', reason);
  }
  getDataForExpansionCard(): Observable<any> {
    console.log("data for expansion card reached");
    return this.http.get(this.url + '/getlatestreport', this.options)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  appointmentGetDetails(doctorId : string) : Observable<any> {
    return this.http
            .get(this.url + "/payment/fetch-appointment/doctor/" + doctorId, this.options)
            .pipe(retry(2), catchError(this.handleError))
  }

  private handleError(error : HttpErrorResponse){
    if(error.error instanceof ErrorEvent) {
      console.log('error occur : ', error.error.message);
    } else {
      console.log(' Backend returned code ${error.status}')  + 
                      'body is  : ${error.error}'; 
    }
    return throwError('something bad happen try again later');
  }
}

