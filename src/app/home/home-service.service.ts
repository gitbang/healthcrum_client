import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {Http, RequestOptions} from '@angular/http'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  
  

  url : string = 'http://localhost:3000'
 
  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  option = { headers: this.headers };

  

  constructor( private http : HttpClient) {

    console.log("inside home service ");
    this.addCompleteDetailsToCart(JSON.parse(localStorage.getItem('test')))
  }


  //----------check login------------//
  checkLogin() {
    let isLogin = localStorage.getItem('login');
    return isLogin == "true" ? true : false
  }


  /*---------------- blood test component ---------------*/

  //-----------user cart ----------------//
  private messageSource = new BehaviorSubject([]);
  currentCart = this.messageSource.asObservable();

  changeMessage(message: string[]) {
    this.messageSource.next(message)
    console.log(this.messageSource.value)
  }

  private cartSource = new BehaviorSubject([]);
  currentCompleteCart = this.cartSource.asObservable();

  addCompleteDetailsToCart(data ) {
    this.cartSource.next(data)
    console.log("service reached ", this.cartSource.value)

    localStorage.setItem("test", JSON.stringify(data) )
    let fetchtest =  JSON.parse(localStorage.getItem('test'));
    console.log("local",fetchtest)
  }

  bloodTestApplyFilters(filter) : Observable<any> {
    return this.http
            .post(this.url+ '/bloodtest/filters', filter, this.option)
            .pipe(retry(2), catchError(this.handleError))
  } 

  //----for view detail-----//
  private singleTest = new BehaviorSubject([]);
  currentTest = this.singleTest.asObservable();

  bookSingleTest(testdata : string[]) : void {
    this.singleTest.next(testdata);
    console.log("Detail selected");
  }

  bloodtestAddMember(userId : string, data : object) : Observable<any>{
    console.log("in service , add member : ", data)
    return this.http
                .post(this.url + '/savemember/' + userId, data, this.option)
                .pipe(retry(2), catchError(this.handleError))
  }

  bloodTestFetchMember(userId : string) : Observable<any>{
    console.log(userId)
    return this.http
                .get(this.url + '/getfamilymembers/' + userId, this.option)
                .pipe(retry(2), catchError(this.handleError))
  }
  
  bloodTestFetchAllTest() : Observable <any> {
    return this.http
                .get(this.url + '/alltestsbylabs', this.option)
                .pipe( retry(2), catchError(this.handleError))
  }
  
  bloodtestDetailById(id : string, type : object) : Observable<any> {
    console.log("in service ",type)
    return this.http
              .post(this.url + '/gettestbyid/' + id, type, this.option)
              .pipe(retry(2), catchError(this.handleError))
  }


 //-------------- consultation---------------//

  private doctorselectedforDetails = new BehaviorSubject([]);
  currendoctor = this.doctorselectedforDetails.asObservable();

  changedoctor(message : string[]) {
    console.log("inservice", message);
    this.doctorselectedforDetails.next(message)
  }

  getDoctorByCategory(name : string) : Observable<any>{
    return this.http
            .get(this.url + '/'+ name + '/doctors', this.option)
            .pipe(retry(2), catchError(this.handleError))
  }

  consultationFilterByCity(city : string) : Observable<any> {
    return this.http
              .get(this.url + '/' + city,  this.option)
              .pipe(retry(2), catchError(this.handleError))
  }

  consultationFilterByCityAndState(city : string, state : string) : Observable<any> {
    return this.http
              .get(this.url + '/' + state + '/' + city,  this.option)
              .pipe(retry(2), catchError(this.handleError))
  }
  
  consultationFilter(filters : Object) : Observable<any>{
    return this.http
              .post(this.url + '/filterdoctor', filters)
              .pipe(retry(2), catchError(this.handleError))
  }

  consultationBookOtpcheck(data ) : Observable<any> {
    return this.http
              .post(this.url + '/sendotp', data)
              .pipe(retry(2), catchError(this.handleError))
  }

  consultationChekOTP(data) : Observable <any>{
    return this.http
            .post(this.url + '/verifyotp', data)
            .pipe(retry(2), catchError(this.handleError))
  }

  consultationResendOTP(data) : Observable<any> {
    return this.http
                .post(this.url + '/retryotp', data)
                .pipe(retry(2), catchError(this.handleError))
  }

  private consultationdoctorForAppointment = new BehaviorSubject([]);
  consultationDoctorSelectedData = this.consultationdoctorForAppointment.asObservable();

  ConsultationchangeDoctorSelected(message : Array<any>) {
    this.consultationdoctorForAppointment.next(message)
  }

  consultationBookAppointment(userId : string, data ) : Observable<any>{
    return this.http  
              .post(this.url + ' /saveappointement/' + userId, data ,this.option)
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



