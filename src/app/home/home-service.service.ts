import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Http, RequestOptions} from '@angular/http'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
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
  addCompleteDetails(data ) {
    this.cartSource.next(data)
    console.log("service reached ", this.cartSource.value)
  }




 //-------------- consultation---------------//

  private doctorselectedforDetails = new BehaviorSubject({});
  currendoctor = this.doctorselectedforDetails.asObservable();

  changedoctor(message : object) {
    console.log(message);
    this.doctorselectedforDetails.next(message)
  }


  //------------blood test----------------//

  bloodTestApplyFilters(filter) : Observable<any> {
    return this.http
            .post(this.url+ '/', filter, this.option)
            .pipe(retry(2))
  } 





//---------------- book-test---------------//

  addNewMember(data) : Observable <any> {
    return this.http
            .post(this.url + '/', data, this.option)
            .pipe(retry(2))
  }

  getMembers(data ) : Observable <any> {
    return ;
  }
  
  //getMembers(data) :
} 
