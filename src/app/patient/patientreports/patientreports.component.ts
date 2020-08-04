import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material'
import { data } from 'app/company/pages/employee-tracking/show-detail/show-detail.component';

export interface tableData {
  healthcrumId : string;
  testName : string;
  location : string;
  labName : string;
  cost : number,
  reportDate : string,
}

@Component({
  selector: 'app-patientreports',
  templateUrl: './patientreports.component.html',
  styleUrls: ['./patientreports.component.scss']
})
export class PatientreportsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private router : Router,
    private localService : AuthServiceLocal
  ) { }

  testToShow : any[] = []
  displayedColumns: string[] = ["healthcrumId", "testName", "location", "labName", "cost", "reportDate", "status", "downloadReport"];
  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role == 'doctor') {
      this.router.navigateByUrl('/login')
      return
    }
    this.assignBloodTest();
   
  }

  assignBloodTest(){
    let add = {
      healthcrumId : "123456",
      testName : "Blood Test",
      location : "ludhiana",
      labName : "Abcdef",
      cost : 2000,
      reportDate : "12/12/2020",
      status : 'Completed'
    }
    this.testToShow.push(add)
    this.bloodTestTableData = new MatTableDataSource(this.testToShow)
    this.bloodTestTableData.paginator = this.paginator
  }

  getReport(orderId : string, action :string){
    console.log("download report reached")
  }

  bloodTestTableData : MatTableDataSource<tableData[]>

  applyFilter(filterText: string){
    this.bloodTestTableData.filter = filterText.trim( ).toLowerCase()
  }
}
