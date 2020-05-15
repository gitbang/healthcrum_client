import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {catchError, retry} from 'rxjs/operators';
import {Observable , of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { }

  userId = "5e8efa895b324a3e4c97a278";
  url: String = "http://localhost:3000";
  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  option = {headers : this.headers}

  // ------------------------company dashboard------------------------// 

  dataForAllPackages(compantName : string) : Observable <any> {
    console.log("all package reached");
    return this.http.get(this.url + compantName, this.option)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  dataForParticularPackage(compantName, packageName) : Observable<any> {
    console.log("particular package reached");
    return this.http
      .get(this.url + compantName + '/'+ packageName, this.option)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
  }
  


  // -------------------------------employ registeration ------------------------//
  registerationGetallEmploy() : Observable<any> {
    return this.http.get(this.url + "/getemployeedetails/"+ this.userId)
  }

  addNewEmploy(data) : Observable<any> {
    return this.http
      .post(this.url + '/addnewemployee'+ this.userId, data, this.option)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
  }

  uploadCsvFile(file) : Observable <any> {
    console.log("reached")
    return this.http
      .post(this.url + '/uploadcsv/'+ this.userId, file, this.option)     // here use company id instead of user id
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
  }
  
  //--------------------------------------event article----------------------------//

  getallArticles() : Observable<any>{
    return this.http.get(this.url + "/getallarticles/" + this.userId, this.option)
  }

  getallEvents() : Observable<any> {
    return this.http.get(this.url + "/getevents/" + this.userId, this.option)
  }
  addevent(data) : Observable <any> {
    console.log(data);
    return this.http
      .post(this.url + '/addevents/' + this.userId, data, this.option)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
  }

  addarticle(data ) :Observable <any> {
    return this.http.post(this.url + "/savearticle/" + this.userId, data, this.option )
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
  }

  // ----------------------booked appointment ----------------------//

  bookappointment(data) : Observable <any> {
    console.log(data)
    return this.http
      .post(this.url + "/bookappontement/" + this.userId, data, this.option)
        .pipe(
          retry(2)
        )
  }

  appointmentGetDetailsOfEmploysByBranch(branchName : string) : Observable <any> {
    return this.http
      .post(this.url + "/getemployeesbybranch/" + this.userId, {branch : branchName }, this.option)
        .pipe(
          retry(2)
        )
  }

  appointmentDetailOfAllEmploy() : Observable<any> {
    return this.http
      .get(this.url + "/getemployees/" + this.userId, this.option)
        .pipe(
          retry(2)
        )
  }

  // -----------------------feedback ----------------------------------//

  feedbackSend(data) : Observable<any> {
    console.log(data)
     return this.http.post(this.url + '/hr/savefeedback/' + this.userId, data, this.option)
  }
  getFeedback() : Observable <any> {
    return this.http.get(this.url + "/hr/getfeedback/"+ this.userId, this.option)
  }

  // ------------------------employ tracking---------------------------//
  trackingDateWise(data) :Observable <any> {
    return this.http
      .post(this.url + "/hr/getemployeebydate/" + this.userId, data, this.option)
        .pipe(
          retry(2)
        )
  }
  trackingFilterSearch(data) : Observable<any> {
    return this.http
      .post(this.url + "/hr/addnewappointement/" + this.userId, data, this.option)
        .pipe(
          retry(2)
        )
  }

  // -----------------------handle error----------------------------//
  private handleError(error : HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('error occur : ' , error.error.message)
    } else{
      console.log (' backend error code ${error.status}' +
                'erroe body : $(error.error)' )
    }
    return 'Something wrong happen try again later'
  }
}
