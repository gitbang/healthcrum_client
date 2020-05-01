import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material'

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
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
  { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" }
]

@Component({
  selector: 'app-last-consultant',
  templateUrl: './last-consultant.component.html',
  styleUrls: ['./last-consultant.component.scss']
})



export class LastConsultantComponent implements OnInit {

  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator

  list = new MatTableDataSource(list1)

  constructor() { }
  col : string[] = ['date', 'doctor', 'symptoms', 'problems', 'diagnosis', 'recommendation']
  ngOnInit() {
    // this.list = [
    // { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
    // { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
    // { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" },
    // { date : new Date(), doctor : 'Akash', symptoms : "nothing", problems : "all fine", diagnosis : "healthy", recommendation : "have balance diet" }
    // ]
    setTimeout(() => this.list.paginator = this.paginator);
    
  }
  viewall(){
    window.alert("send otp to user")
  }
}
