import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';
import {CompanyService} from '../../../company.service'
@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {

  constructor(
    private dialog : MatDialog,
    private dialogRef : MatDialogRef<AddFeedbackComponent>,
    private fb : FormBuilder,
    private service : CompanyService
    ) { 
      dialogRef.disableClose = true
    }

  ngOnInit() {
  }

  feebdack : string;
  textarea : string;
  sendFeedback = this.fb.group({
    empId : ['123456'],
    feedback : ['', Validators.required],
    comment : ['', Validators.required]
  })
  submit(){
    console.log(this.feebdack, this.textarea)
    // call serve to save the feed back
    this.sendFeedback.get('feedback').setValue(this.feebdack)
    this.sendFeedback.get('comment').setValue(this.textarea)
    console.log(this.sendFeedback.value)
    if(this.sendFeedback.valid) {
      this.service.feedbackSend(this.sendFeedback.value).subscribe((response)=>{
        console.log(response)
        this.dialogRef.close({data : true})
      })
    } else{
      alert("Invalid Input field")
    }
  }
}
