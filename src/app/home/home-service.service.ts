import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string[]) {
    this.messageSource.next(message)
    console.log(this.messageSource)
  }
  constructor() { 
    
  }
}
