import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeServiceService } from 'app/home/home-service.service';

@Component({
  selector: 'app-book-model',
  templateUrl: './book-model.component.html',
  styleUrls: ['./book-model.component.scss']
})
export class BookModelComponent implements OnInit {
  data : any;
  constructor(
    @Inject (MAT_DIALOG_DATA) data : any,
    private service : HomeServiceService,
    private fb : FormBuilder,

  ) {
    console.log("received data is : " ,data)
    this.data = data  
   }

   isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }

  slots = ["06:30am" ,"07:30am" ,"08:30am" ,"09:30am" ,"10:30am" ]

  bookedslot : string;
  selected(slot){
    console.log(slot)
    if(this.bookedslot == slot) {
      return true
    } else {
      return false
    }
  }
  bookslot(slot){
    this.bookedslot = slot
  }
}
