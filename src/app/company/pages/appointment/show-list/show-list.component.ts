import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher, MatTableDataSource, MatPaginator} from '@angular/material'
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

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
  name : string,
  email : string,
  contact : number,
  age : number,
  empId : string,
  dept : string,
  branch : string,
  dob : string,
  gender : string
}

/*
const list1 : empdetails[] = [
  {name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12'},
  {name : 'harry1', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'female', dob : '10/10/12'},
  {name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12'},
  {name : 'harry1', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'female', dob : '10/10/12'},
  {name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12'},
  {name : 'harry1', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'female', dob : '10/10/12'},
  {name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12'},
  {name : 'harry1', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'female', dob : '10/10/12'},
  {name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12'},
  {name : 'harry1', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'female', dob : '10/10/12'},
  {name : 'Harry', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'male' ,dob : '10/12/12'},
  {name : 'harry1', email : "ab@gmail.com", contact : 9874563210, age : 20 , empId : '1234', dept : 'warehouse', branch : 'any' , gender : 'female', dob : '10/10/12'}
]
*/

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator

  constructor(
    private dialogRef : MatDialogRef<ShowListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    dialogRef.disableClose = true;
    console.log("in pop up", data)
  }
  ngOnInit() {
    setTimeout(() => this.list.paginator = this.paginator)
    console.log("data");
    console.log(this.data.result);
    this.list = new MatTableDataSource(this.data.result)
    console.log(this.list)
  }
  col : string[] = ['name', 'email', 'contact', 'age', 'empId', 'dept', 'branch', 'dob', 'gender']
  list : any// new MatTableDataSource(list1);
  closeDialog(){
    this.dialogRef.close()
  }
  applyFilter(value){
    this.list.filter = value.trim().toLowerCase();
  }
}
