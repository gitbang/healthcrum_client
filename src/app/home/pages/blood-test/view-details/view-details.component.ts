import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<ViewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
  ) { 
    console.log(data)
    this.shownresult = data
  }
  shownresult : any
  ngOnInit() {
  }

}
