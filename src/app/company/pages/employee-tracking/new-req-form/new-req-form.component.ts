import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material';
import {CompanyService} from '../../../company.service'
@Component({
  selector: 'app-new-req-form',
  templateUrl: './new-req-form.component.html',
  styleUrls: ['./new-req-form.component.scss']
})
export class NewReqFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private fb : FormBuilder,  
    private dialogRef : MatDialogRef<NewReqFormComponent>,
    private service : CompanyService  
  ) {
    console.log("in pop up",data)
  }
  ngOnInit() {
  }

  filter = this.fb.group({
    empId : [''], // empId
    reqDate : [''],
    city : ['']
  })
  search(){
    console.log(this.filter);
    this.service.trackingFilterSearch(this.filter.value).subscribe((result)=>{
      this.dialogRef.close(result)
    })
    //this.dialogRef.close( this.filter.value)
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
