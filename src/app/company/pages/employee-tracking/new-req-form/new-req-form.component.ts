import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-new-req-form',
  templateUrl: './new-req-form.component.html',
  styleUrls: ['./new-req-form.component.scss']
})
export class NewReqFormComponent implements OnInit {

  constructor(private fb : FormBuilder,  private dialogRef : MatDialogRef<NewReqFormComponent>) {
  }
  ngOnInit() {
  }

  filter = this.fb.group({
    id : [''],
    date : [''],
    city : ['']
  })
  search(){
    console.log(this.filter);
    this.dialogRef.close( this.filter.value)
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
