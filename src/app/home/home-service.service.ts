import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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


  constructor(
    private http : HttpClient
  ) {   
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
  }

  bloodTestApplyFilters(filter) : Observable<any> {
    return this.http
            .post(this.url+ '/', filter, this.option)
            .pipe(retry(2))
  } 

  private singleTest = new BehaviorSubject([]);
  currentTest = this.singleTest.asObservable();

  bookSingleTest(testdata : string[]) : void {
    this.singleTest.next(testdata);
    console.log("single test seected");
  }

  bloodtestAddMember(userId : string, data : object) : Observable<any>{
    console.log("in service , add member : ", data)
    return this.http
                .post(this.url + '/savemember/' + userId, data, this.option)
                .pipe(retry(2))
  }

  bloodTestFetchMember(userId : string) : Observable<any>{
    console.log(userId)
    return this.http
                .get(this.url + '/getfamilymembers/' + userId, this.option)
                .pipe(retry(2))
  }


 //-------------- consultation---------------//

  private doctorselectedforDetails = new BehaviorSubject({});
  currendoctor = this.doctorselectedforDetails.asObservable();

  changedoctor(message : object) {
    console.log(message);
    this.doctorselectedforDetails.next(message)
  }

  getDoctorByCategory(name : string) : Observable<any>{
    return this.http
            .get(this.url + '/'+ name + '/doctors', this.option)
            .pipe(retry(2))
  }

  consultationFilterByCity(city : string) : Observable<any> {
    return this.http
              .get(this.url + '/' + city,  this.option)
              .pipe(retry(2))
  }

  consultationFilterByCityAndState(city : string, state : string) : Observable<any> {
    return this.http
              .get(this.url + '/' + state + '/' + city,  this.option)
              .pipe(retry(2))
  }
  
  consultationFilter(filters : Object) : Observable<any>{
    console.log("in services : filters are : ", filters)
    return this.http
              .post(this.url + '/filterdoctor', filters)
              .pipe(retry(2))
  }

  consultationBookOtpcheck(data ) : Observable<any> {
    return this.http
              .post(this.url + '/sendotp', data)
              .pipe(retry(2))
  }

  consultationChekOTP(data) : Observable <any>{
    return this.http
            .post(this.url + '/verifyotp', data)
            .pipe(retry(2))
  }
  private consultationdoctorForAppointment = new BehaviorSubject({});
  consultationDoctorSelectedData = this.messageSource.asObservable();

  ConsultationchangeDoctorSelected(message : object) {
    this.consultationdoctorForAppointment.next(message)
    console.log(this.messageSource.value)
  }

  consultationBookAppointment(userId : string, data ) : Observable<any>{
    return this.http  
              .post(this.url + ' /saveappointement/' + userId, data ,this.option)
              .pipe(retry(2))
  }

//---------------- book-test---------------//

} 

