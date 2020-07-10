import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { data } from 'app/company/pages/employee-tracking/show-detail/show-detail.component';
@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.scss']
})
export class SocialDetailsComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<SocialDetailsComponent>,
    @Inject (MAT_DIALOG_DATA) public data : any
  ) { 
    console.log(data)
  }

  user_email: String;
  user_pass: String;
  user_name: String;
  user_cpass: String;
  user_mob: String;
  user_type: String;
  user_gender: String = "none";
  agree = false;
  employeeId : String;
  companyId :String
  branchId :String
  departmentId :String
  ngOnInit() {

  }

}
