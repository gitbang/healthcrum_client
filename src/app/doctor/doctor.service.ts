import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http : HttpClient) { }

  submitdaya(form1, form2) : Observable<any>{
    console.log("form submission reached");
    console.log(form1, form2);
    var send = {
      'form1' : form1,
      'form2' : form2,
    }
    return this.http.get('');
  }
  hradetails () : Observable<any> {
    console.log("this is hra details");
    return this.http.get('' )
  }
  reaonFromHra(reason) : Observable <any> {
    console.log("reason service reached");
    return this.http.post('', reason);
  }
  getDataForExpansionCard(): Observable<any> {
    console.log("data for expansion card reached");
    return this.http.get('')
  }
}

