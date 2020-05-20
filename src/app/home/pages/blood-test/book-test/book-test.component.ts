import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-book-test',
  templateUrl: './book-test.component.html',
  styleUrls: ['./book-test.component.scss']
})
export class BookTestComponent implements OnInit {

  constructor(private router : Router) { }
  userlogin : boolean = true
  ngOnInit() {
    if(this.userlogin == false) {
      this.router.navigateByUrl('/signup')
    }
  }
  shownresultarrays =[
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
  ]
}
