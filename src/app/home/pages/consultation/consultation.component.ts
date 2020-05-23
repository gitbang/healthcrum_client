import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doctors = [ 
    {image : '', name : 'Mr Bawa', experience : '10+ years', speciality : 'Heart'},
    {image : '', name : 'Mr Bawa', experience : '10+ years', speciality : 'Heart'},
    {image : '', name : 'Mr Bawa', experience : '10+ years', speciality : 'Heart'},
    {image : '', name : 'Mr Bawa', experience : '10+ years', speciality : 'Heart'},
    {image : '', name : 'Mr Bawa', experience : '10+ years', speciality : 'Heart'},
    {image : '', name : 'Mr Bawa', experience : '10+ years', speciality : 'Heart'},
    {image : '', name : 'Mr Bawa', experience : '10+ years', speciality : 'Heart'},
    {image : '', name : 'Mr Bawa', experience : '10+ years', speciality : 'Heart'},
  ]
  shownresultarray = [
    {_id : "abc123", name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
    {_id : "abc1234", name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
    {_id : "abc1235", name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
    {_id : "abc1236", name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
    {_id : "abc1237", name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
    {_id : "abc1238", name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
  ]
}
