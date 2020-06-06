import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ERecieptComponent } from '../e-reciept/e-reciept.component';
import { HomeServiceService } from 'app/home/home-service.service';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog : MatDialog,
    private service : HomeServiceService
  ) { }

  ngOnInit() {
    this.service.consultationDoctorSelectedData.subscribe(result=>{
      console.log(result);
      this.completeData = result
    })
  }
  completeData;
  shownresultarrays =[
      { 
      _id : '',  
      mobileNo : 9874563210,
      docname : "Dr. AR Kapoor", 
      healcrumprice : 2500, 
      offerprice : 2000,
      type: "video",          // telephone, physical , chat
      timeslot : '06:30am',
      date : '10/12/2020',
      amount : 1500,
      saved : 100,
    }, 
  ]
  placeorder(){
    console.log("place order go to gateway")
    // call the api for the payment gateway
    //this.router.navigateByUrl('consultation/e-reciept')
    const dialog = this.dialog.open(ERecieptComponent, {
      height : "90vh",
      width : "60%"
    })

    dialog.afterClosed().subscribe(result=>{
      this.router.navigateByUrl("consultation")
    })
  }

}
