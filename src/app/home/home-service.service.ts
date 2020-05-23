import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  

  constructor() {   
  }

  //-----------user cart ----------------//

  private messageSource = new BehaviorSubject([]);
  currentCart = this.messageSource.asObservable();
  changeMessage(message: string[]) {
    this.messageSource.next(message)
    console.log(this.messageSource)
  }

  //--------single doctor details --------//

  private doctorselectedforDetails = new BehaviorSubject({});
  currendoctor = this.doctorselectedforDetails.asObservable();

  changedoctor(message : object) {
    console.log(message);
    this.doctorselectedforDetails.next(message)
  }

}
