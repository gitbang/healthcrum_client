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
import {CompanyService} from '../../../company.service'

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
    private service : CompanyService,
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
   // id: ['', Validators.required],
    title : ['', [Validators.required]], // title
    startDate : ['',[Validators.required]], // startDate // endDate // time
    endDate : [''],
    time : [''],
    location : ['',Validators.required],
    slots : ['', Validators.required],
    lastBookingDate: ['', [Validators.required]],  //  B D
    price : ['', Validators.required],
    description : ['', Validators.required],  // description
    banner : ['']
  })
  
  articleStepper = this._formBuilder.group({
    //id : ['', Validators.required],
    title : ['', Validators.required],
    article : ['', Validators.required],
    postedBy: ['', Validators.required],
    //show : ['', Validators.required],
    postedOn : ['', Validators.required]
  })
  matcher = new MyErrorStateMatcher();


  closeDialog(){
    let response = confirm("Are you sure to exit. Your data will lose");
    if(response)
      this.dialogRef.close({result : false});
  }
  
  selectedFile  : File;
  sendfile : FormData;

  submit(){
    this.firstStepper.get('banner').setValue(this.sendfile);
    if(this.firstStepper.valid) {
      console.log(this.firstStepper.value)
      this.service.addevent(this.firstStepper.value).subscribe((response)=>{
        console.log(response)
        this.dialogRef.close({result : true})
      })
    } else{
      console.log("invalid")
      alert("Form input is invalid")
    }
  }
  submitarticle(){
    console.log(this.articleStepper.value)
    this.service.addarticle(this.articleStepper.value).subscribe((response)=>{
      console.log(response)
      this.dialogRef.close({result : true});
    })
    
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];
    const fd = new FormData;
    fd.append('image',this.selectedFile, this.selectedFile.name)
    
    this.sendfile = fd;
    // this.firstStepper.get('banner').setValue=
  }
}
