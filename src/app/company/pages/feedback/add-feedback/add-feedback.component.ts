import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {

  constructor(
    private dialog : MatDialog,
    private dialogRef : MatDialogRef<AddFeedbackComponent>
    ) { 
      dialogRef.disableClose = true
    }

  ngOnInit() {
  }

  feebdack : string;
  textarea : string;
  submit(){
    console.log(this.feebdack, this.textarea)
    // call serve to save the feed back
    this.dialogRef.close({data : true})
  }
}
