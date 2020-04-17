import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) { }
  url: String = "http://localhost:3000/patient/hra-question";

  /*getQuestion(category : string): Observable<any>{
    console.log("service reached");
    return this.http.get<any>(this.url + category)
  }*/

  getQuestions(category : string){
    console.log(category)
    console.log("service reached")
    return this.http.get('http://localhost:3000/patient/hra-questions/' + category )
  }
  saveAns(ans) {
    console.log("reached")
    console.log(ans)
    
    return this.http.post('http://localhost:3000/usersave',ans)
  }
}
