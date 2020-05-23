import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {HomeServiceService} from '../../../home-service.service'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material'
import { AddMemberComponent } from '../add-member/add-member.component';
@Component({
  selector: 'app-book-test',
  templateUrl: './book-test.component.html',
  styleUrls: ['./book-test.component.scss']
})
export class BookTestComponent implements OnInit {

  constructor(
    private router : Router,
    private service : HomeServiceService,
    private dialog : MatDialog,
  ) {
    this.service.currentMessage.subscribe((result)=>{
      console.log(result)
    })
   }

  userlogin : boolean = true
  ngOnInit() {
    if(this.userlogin == false) {
     // this.router.navigateByUrl('/signup')
    }
  }
  shownresultarrays =[
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
  ]
  placeorderClass : string = ""
  
  changeStyle(event) {
    this.placeorderClass = event.type == 'mouseover' ? 'btn-success' : '';
  }

  addmore(){
    this.router.navigateByUrl('blood-test')
  }

  placeorder(){
    console.log("next portal")
  }

  deletefromCart(index : number) {
    console.log("delete")
  }

  userId : string = "123456";
  addMember(){
    this.dialog.open(AddMemberComponent, {
      data : this.userId
    })
  }

  
}
