import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from "@angular/material"
import {MatPaginator, MatTableDataSource} from '@angular/material'
import {AuthServiceLocal} from '../../../services/auth-service.service'
import {Router} from '@angular/router'

export interface samedoctor {
  date : Date,
  doctor : String,
  symptoms : String,
  problems : String,
  diagnosis : String,
  recommendation : String
}

const list1 : samedoctor[] = [
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Malhotra', symptoms : "b", problems : "minor", diagnosis : "good healthy", recommendation : "have food" },
  { date : new Date(), doctor : 'Verma', symptoms : "others", problems : "all fine", diagnosis : " good", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Sharma', symptoms : "almost none", problems : "minor", diagnosis : "healthy", recommendation : "have vegetables" },
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Malhotra', symptoms : "b", problems : "minor", diagnosis : "good healthy", recommendation : "have food" },
  { date : new Date(), doctor : 'Verma', symptoms : "others", problems : "all fine", diagnosis : " good", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Sharma', symptoms : "almost none", problems : "minor", diagnosis : "healthy", recommendation : "have vegetables" },
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Malhotra', symptoms : "b", problems : "minor", diagnosis : "good healthy", recommendation : "have food" },
  { date : new Date(), doctor : 'Verma', symptoms : "others", problems : "all fine", diagnosis : " good", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Sharma', symptoms : "almost none", problems : "minor", diagnosis : "healthy", recommendation : "have vegetables" },
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Malhotra', symptoms : "b", problems : "minor", diagnosis : "good healthy", recommendation : "have food" },
  { date : new Date(), doctor : 'Verma', symptoms : "others", problems : "all fine", diagnosis : " good", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Sharma', symptoms : "almost none", problems : "minor", diagnosis : "healthy", recommendation : "have vegetables" },
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Malhotra', symptoms : "b", problems : "minor", diagnosis : "good healthy", recommendation : "have food" },
  { date : new Date(), doctor : 'Verma', symptoms : "others", problems : "all fine", diagnosis : " good", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Sharma', symptoms : "almost none", problems : "minor", diagnosis : "healthy", recommendation : "have vegetables" },
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Malhotra', symptoms : "b", problems : "minor", diagnosis : "good healthy", recommendation : "have food" },
  { date : new Date(), doctor : 'Verma', symptoms : "others", problems : "all fine", diagnosis : " good", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Sharma', symptoms : "almost none", problems : "minor", diagnosis : "healthy", recommendation : "have vegetables" },
]


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator

  list = new MatTableDataSource(list1);
  col : string[] = ['date', 'doctor',  'diagnosis', 'recommendation'];
  dashcol : string[]= ['date', 'id', 'testName', 'result'];
  dashboardList;
  dashlist;
  priscription;
  
  showProfile(){}

  public showPriscribtion = false;

  constructor( 
    private dialog : MatDialog,
    private localService : AuthServiceLocal,
    private router : Router
    ) {
    
  }

  patientDetails = {
    name : 'abcd',
    id : '12345',
    address : 'jalandhar punjab ',
    dob : '10-june-2005',
    maritalStatus : 'Unmarried',
    phoneNo : 9874563210,
    appointments : [
      {date : '10-june-2018', id : '54321', testName : 'blood test', result : 'normal'},
      {date : '10-june-2018', id : '54321', testName : 'blood test', result : 'normal'},
      {date : '10-june-2018', id : '54321', testName : 'blood test', result : 'normal'},
      {date : '10-june-2018', id : '54321', testName : 'blood test', result : 'normal'},
      {date : '10-june-2018', id : '54321', testName : 'blood test', result : 'normal'},
    ]
  }

  ngOnInit() {

    // check login user is doctor or not 
    let role = this.localService.getUserRole();
    if(role != 'doctor') {
      this.router.navigateByUrl('/login')
    }

    // create service which fetch user details from database 

    this.dashlist = new MatTableDataSource(this.patientDetails.appointments)
    console.log(this.dashlist);
    //console.log(this.list)
    setTimeout(() => this.list.paginator = this.paginator);

  
  }
  
}
