import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

@Component({
  selector: 'app-add-event-article',
  templateUrl: './add-event-article.component.html',
  styleUrls: ['./add-event-article.component.scss']
})
export class AddEventArticleComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<AddEventArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      dialogRef.disableClose = true
  }

  ngOnInit() {
    console.log(this.data)
  }

  display : string;
  genderList: string[] = ["Male", "Female", "other"];
  firstStepper = this._formBuilder.group({
    id: ['', Validators.required],
    name : ['', [Validators.required]],
    starton : ['',[Validators.required]],
    location : ['',Validators.required],
    slots : ['', Validators.required],
    lastbookingdate: ['', [Validators.required]],
    price : ['', Validators.required],
    details : ['', Validators.required]
  })
  
  articleStepper = this._formBuilder.group({
    id : ['', Validators.required],
    name : ['', Validators.required],
    postby: ['', Validators.required],
    show : ['', Validators.required],
  })
  matcher = new MyErrorStateMatcher();


  closeDialog(){
    let response = confirm("Are you sure to exit. Your data will lose");
    if(response)
      this.dialogRef.close({result : false});
  }
  
  submit(){
    if(this.firstStepper.valid) {
      let registerationform = this._formBuilder.group({
        firststep : this.firstStepper
      })
      this.dialogRef.close({registerationform, result : true})
    } else{
      console.log("invalid")
      alert("Form input is invalid")
    }
  }
  submitarticle(){
    console.log(this.articleStepper.value)
  }
}
