import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeServiceService } from 'app/home/home-service.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  userId : string
  constructor(
    @Inject (MAT_DIALOG_DATA) data : any,
    private fb : FormBuilder,
    private dialogRef : MatDialogRef<AddMemberComponent>,
    private service : HomeServiceService
  ) {
    console.log(data)
    this.userId = data
    console.log("in constructor userId" , this.userId)
  }
  genderList : string[] = ["Male", "Female", "Others"]
  registerationForm = this.fb.group({
    name : ['', Validators.required],
    gender : ['', Validators.required],
    age : ['', Validators.required],
    phoneNo : ['', Validators.required]
  })

  ngOnInit() {
  }

  submit(){
    console.log(this.registerationForm.value)
    if(this.registerationForm.valid){
      this.service.bloodtestAddMember( this.userId,this.registerationForm.value).subscribe((response)=>{
        console.log("response after in submit", response)
        if(response.success){
          this.dialogRef.close({success : true})
        } else {
          this.dialogRef.close({success : false})
        }
      });
    }
  }

  closeDialog() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(result)
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.dialogRef.close({success : false})
      }
    })
  }
}
