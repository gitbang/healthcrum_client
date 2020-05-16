import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material'

export interface data {
  sno : string,
  name : string,
  age : number,
  id : string,
  dept : string,
  pkg : string,
  location : string,
  dateReq : string,
  dateApp : string,
  lastcheckup : string,
  approved : string,
  done : string,
  repadd : string
}
/*
const list : data[] = [
  {sno : '101', name :'abc', age :19, id:'a1234', dept : '103', pkg: 'gold', location:'delhi', dateReq:'10/12/19', dateApp:'20/12/19',lastcheckup:'null', approved :'approved', done :'not done', repadd :'30/12/20'},
  {sno : '101', name :'abc', age :19, id:'a1234', dept : '103', pkg: 'gold', location:'delhi', dateReq:'10/12/19', dateApp:'20/12/19',lastcheckup:'null', approved :'approved', done :'not done', repadd :'30/12/20'},
  {sno : '101', name :'abc', age :19, id:'a1234', dept : '103', pkg: 'gold', location:'delhi', dateReq:'10/12/19', dateApp:'20/12/19',lastcheckup:'null', approved :'approved', done :'not done', repadd :'30/12/20'},
  {sno : '101', name :'abc', age :19, id:'a1234', dept : '103', pkg: 'gold', location:'delhi', dateReq:'10/12/19', dateApp:'20/12/19',lastcheckup:'null', approved :'approved', done :'not done', repadd :'30/12/20'},
  {sno : '101', name :'abc', age :19, id:'a1234', dept : '103', pkg: 'gold', location:'delhi', dateReq:'10/12/19', dateApp:'20/12/19',lastcheckup:'null', approved :'approved', done :'not done', repadd :'30/12/20'},
  {sno : '101', name :'abc', age :19, id:'a1234', dept : '103', pkg: 'gold', location:'delhi', dateReq:'10/12/19', dateApp:'20/12/19',lastcheckup:'null', approved :'approved', done :'not done', repadd :'30/12/20'},
  {sno : '101', name :'abc', age :19, id:'a1234', dept : '103', pkg: 'gold', location:'delhi', dateReq:'10/12/19', dateApp:'20/12/19',lastcheckup:'null', approved :'approved', done :'not done', repadd :'30/12/20'},
  {sno : '101', name :'abc', age :19, id:'a1234', dept : '103', pkg: 'gold', location:'delhi', dateReq:'10/12/19', dateApp:'20/12/19',lastcheckup:'null', approved :'approved', done :'not done', repadd :'30/12/20'},
]
*/
@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})

export class ShowDetailComponent implements OnInit {

  empdata = new MatTableDataSource
  tabledata ;
  //col : string[] = ['sno', 'name','age','id','dept','pkg','location', 'dateReq','dateApp' ,'lastcheckup', 'approved', 'done', 'repadd']
  col : string[] = ['number', 'empId', 'company', 'city', 'appointementDate', 'created_on', 'reqDate']
  constructor(
    @Inject(MAT_DIALOG_DATA) data : any  
  ) { 
    this.tabledata = data;
    this.empdata = new MatTableDataSource(data)
  }
  ngOnInit() {
    console.log(this.tabledata)
  }
}
