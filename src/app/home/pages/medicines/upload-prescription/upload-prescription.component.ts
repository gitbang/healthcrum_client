import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';
import { HomeServiceService } from 'app/home/home-service.service';
import {FormBuilder, Form, Validators} from "@angular/forms"
@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload-prescription.component.html',
  styleUrls: ['./upload-prescription.component.scss']
})
export class UploadPrescriptionComponent implements OnInit {

  isLogin : boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<UploadPrescriptionComponent>,
    private service : HomeServiceService,
    private fb : FormBuilder
  ) {
    this.dialogRef.disableClose = true
   }

  ngOnInit() {
    this.isLogin = this.service.checkLogin();
  }
  registerationForm = this.fb.group({
    name : ['', Validators.required],
    phoneNo : ['', Validators.required],
    file : ['']
  })

  secondForm = this.fb.group({
    otp : ['']
  })
  closeDialog(){
    this.dialogRef.close({success : false})
  }

  selectFile : File = null
  filechanged(event) {
    console.log(event)
    if(event.target.files.length > 0) {
      console.log("entered")
      this.selectFile = <File>event.target.files[0];
      this.upload()
    } 
  }

  upload(){
    if(this.selectFile != null) {
      console.log(event);
      const fileData = new FormData();
      fileData.append('file', this.selectFile)
      fileData.append('data', this.registerationForm.value )
      console.log(this.registerationForm.value)
      console.log("filedata", fileData)
    }
  }
}
