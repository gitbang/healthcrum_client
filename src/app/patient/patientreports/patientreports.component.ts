import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material'
import { data } from 'app/company/pages/employee-tracking/show-detail/show-detail.component';
import {PatientService} from "../patient.service"

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
    private patientService : PatientService,
    private localService : AuthServiceLocal
  ) { }

  userId : string;
  displayedColumns: string[] = ["healthcrumId", "testName",  "labName", "cost", "reportDate", "status", "downloadReport"];
  
  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role == 'doctor') {
      this.router.navigateByUrl('/login')
      return
    }
    this.userId = this.localService.getUserID;
    console.log(this.userId)
    this.fetchAllReport()
  }

  getReport(index : number, action :string){
    console.log(index)
    console.log(this.testToShowNew)
    let url = this.testToShowNew[index].ziplink
    console.log("download report reached")
    console.log(url)
    window.open(url)
  }

  reportNewData : MatTableDataSource<any[]>
  testToShowNew : any[] = []

  applyFilter(filterText: string){
    console.log(filterText)
  
    this.reportNewData.filter = filterText.trim().toLowerCase();
  }

  fetchAllReport(){
    this.patientService.reportFetchAll(this.userId).subscribe((result)=>{
      console.log(result)
      if(result.success){
        this.addBloodTest(result)
      }
    })
  }

  addBloodTest(result){
    console.log(result.data.length)
    for(let i = 0; i < result.data.length; i++) {
      console.log("in loop")
      let add;
      add = {
        orderId : result.data[i]._id,
        orderNumber : result.data[i].orderNumber,
        totalamount : result.data[i].amountDetails.amount,
        orderDetails :  result.data[i].orderDetails,
        createdAt : result.data[i].createdAt,
        updateAt : result.data[i].updatedAt,               // here display updateAt when status is completed
        status : result.data[i].Orderstatus,
        ziplink : (result.data[i].Orderstatus == 'completed' ? 
                      this.patientService.completeURl(result.data[i].report_file) : null)
      }
      console.log(add)
      this.testToShowNew.push(add)
     // this.bloodTests.push(add);
    }
    this.reportNewData = new MatTableDataSource(this.testToShowNew)
    this.reportNewData.paginator = this.paginator
    console.log("mat paginator data is  : ", this.reportNewData)
  }
}
