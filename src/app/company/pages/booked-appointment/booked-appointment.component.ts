import { Component, OnInit, ViewChild } from "@angular/core";
import { ErrorStateMatcher, MatTableDataSource, MatPaginator } from "@angular/material";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { data } from "../employee-tracking/show-detail/show-detail.component";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export interface empdetails {
  healthcrumId : string,
  name : string,
  email : string,
  contact : number,
  age : number,
  empId : string,
  dept : string,
  branch : string,
  dob : string,
  gender : string,
  pkg : string,
  bookingdate : string,
  reqdate : string,
  appdate : string,
  diagnosticCentre : string,
  location : string,
  hraStatus : string,
  checkupStatus : string
}

const list1 : empdetails[] = [
  {healthcrumId: "123456", name : 'akash', email : "ab@gmail.com", contact : 9874563210, age : 20 ,
  empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12',
  pkg : "Gold", bookingdate : "10/12/2020", reqdate : '08/12/2020', appdate :'20/10/12', diagnosticCentre :'Metropolis',
  location : 'Delhi', hraStatus : "pending", checkupStatus:'pending'
  },
  {healthcrumId: "123456", name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 ,
  empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12',
  pkg : "Gold", bookingdate : "10/12/2020", reqdate : '08/12/2020', appdate :'20/10/12', diagnosticCentre :'Metropolis',
  location : 'Delhi', hraStatus : "pending", checkupStatus:'pending'
  },
  {healthcrumId: "123456", name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 ,
  empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12',
  pkg : "Gold", bookingdate : "10/12/2020", reqdate : '08/12/2020', appdate :'20/10/12', diagnosticCentre :'Metropolis',
  location : 'Delhi', hraStatus : "pending", checkupStatus:'pending'
  },
  {healthcrumId: "123456", name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 ,
  empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12',
  pkg : "Gold", bookingdate : "10/12/2020", reqdate : '08/12/2020', appdate :'20/10/12', diagnosticCentre :'Metropolis',
  location : 'Delhi', hraStatus : "pending", checkupStatus:'pending'
  },
  {healthcrumId: "123456", name : 'akash', email : "ab@gmail.com", contact : 9874563210, age : 20 ,
  empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12',
  pkg : "Gold", bookingdate : "10/12/2020", reqdate : '08/12/2020', appdate :'20/10/12', diagnosticCentre :'Metropolis',
  location : 'Delhi', hraStatus : "pending", checkupStatus:'pending'
  },
  {healthcrumId: "123456", name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 ,
  empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12',
  pkg : "Gold", bookingdate : "10/12/2020", reqdate : '08/12/2020', appdate :'20/10/12', diagnosticCentre :'Metropolis',
  location : 'Delhi', hraStatus : "pending", checkupStatus:'pending'
  },
  {healthcrumId: "123456", name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 ,
  empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12',
  pkg : "Gold", bookingdate : "10/12/2020", reqdate : '08/12/2020', appdate :'20/10/12', diagnosticCentre :'Metropolis',
  location : 'Delhi', hraStatus : "pending", checkupStatus:'pending'
  },
  {healthcrumId: "123456", name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 ,
  empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12',
  pkg : "Gold", bookingdate : "10/12/2020", reqdate : '08/12/2020', appdate :'20/10/12', diagnosticCentre :'Metropolis',
  location : 'Delhi', hraStatus : "pending", checkupStatus:'pending'
  },
]


@Component({
  selector: "app-booked-appointment",
  templateUrl: "./booked-appointment.component.html",
  styleUrls: ["./booked-appointment.component.scss"]
})
export class BookedAppointmentComponent implements OnInit {

  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator
  picker_end: String;
  picker_start: String;
  constructor() {}

  ngOnInit() {
    setTimeout(() => this.list.paginator = this.paginator)
  }
  col : string[] = ['healthcrumId','name',  'age', 'empId','dept', 'branch', 'dob', 'gender', 'pkg', 
  'bookingdate', 'reqdate', 'appdate','diagnosticCentre', 'location', 'hraStatus', 'checkupStatus']
  list = new MatTableDataSource(list1);

  applyFilter(value){
    this.list.filter = value.trim().toLowerCase();
  }
}
