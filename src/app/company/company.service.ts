import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {catchError, retry} from 'rxjs/operators';
import {Observable , of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { }

  // company dashboard 

  url : string = 'http:localhost:3000/company/'
  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  option = {headers : this.headers}

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
    return this.http.get(this.url + compantName + '/'+ packageName, this.option)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
  }
  // company dashboard end


  // employee-registeration
  uploadCsvFile(file) : Observable <any> {
    console.log("reached")
    return this.http.post(this.url + 'addemploy/csv', file)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
  }
  //employ-registeration end
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
