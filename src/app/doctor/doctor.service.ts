import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor() { }

  submitdaya(form1, form2) {
    console.log("form submission reached");
    console.log(form1, form2)
  }
  hradetails () {
    console.log("this is hra details")
  }
}

