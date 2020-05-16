import { Component, OnInit } from "@angular/core";
import {MatDialog, MatTableDataSource, MatPaginator} from '@angular/material'
import { FormBuilder, Validators } from "@angular/forms";
import { ShowDetailComponent } from "./show-detail/show-detail.component";
import {NewReqFormComponent} from './new-req-form/new-req-form.component'
import { CompanyService } from "app/company/company.service";
@Component({
  selector: "app-employee-tracking",
  templateUrl: "./employee-tracking.component.html",
  styleUrls: ["./employee-tracking.component.scss"]
})
export class EmployeeTrackingComponent implements OnInit {
  picker_end: String;
  picker_start: String;

  constructor( 
    private fb : FormBuilder,
    private dialog : MatDialog  ,
    private service : CompanyService
  ) {}

  ngOnInit() {}

  form = this.fb.group({
    startDate : ['', Validators.required],
    endDate : ['', Validators.required]
  })

  start : any
  end : any
  dataByDate : any;
  filter() {
   // console.log(this.form.value, this.form.valid);
    if(this.form.valid) {
      this.service.trackingDateWise(this.form.value).subscribe((result)=>{
        console.log(result)
        this.dataByDate = result

        this.dialog.open(ShowDetailComponent, {
          data : result,
          height : "80%",
          width : "80%"
        })
      })
      
    } else{
      alert("Invalid Input")
    }
  }
  addrequest() {
    const filter = this.dialog.open(NewReqFormComponent);
    filter.afterClosed().subscribe((result) =>{
      console.log(result)
    })
  }
}
