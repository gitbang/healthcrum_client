import { Component, OnInit } from "@angular/core";
import {MatDialog, MatTableDataSource, MatPaginator} from '@angular/material'
import { FormBuilder, Validators } from "@angular/forms";
import { ShowDetailComponent } from "./show-detail/show-detail.component";
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
    private dialog : MatDialog  
  ) {}

  ngOnInit() {}
  form = this.fb.group({
    start : ['', Validators.required],
    end : ['', Validators.required]
  })
  start : any
  end : any
  async filter() {
    this.dialog.open(ShowDetailComponent, {
      height : "80%",
      width : "80%"
    })
    console.log(this.form.value, this.form.valid);
    if(this.form.valid) {
      // send http request and pass the data to the dialog box 
      // await http request 
      
    } else{
      alert("Invalid Input")
    }
  }
}
