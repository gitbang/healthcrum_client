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
    @Inject(MAT_DIALOG_DATA) public info: any
  ) {
      console.log(info)
      //dialogRef.disableClose = true
      this.data = info.category
      console.log("data type is 0, :", this.data)
      if(info.type && info.category == "event") {
        this.update = true
        this.fillevent(info.values);
      }
      else if(info.type && info.category == "article"){
        this.fillarticle(info.values)
      }
  }
  update : boolean = false
  fillevent(values) {
    console.log("fill form")
    console.log(values)
    this.firstStepper.get('title').setValue(values.title)
    this.firstStepper.get('startDate').setValue(values.startDate)
    this.firstStepper.get('endDate').setValue(values.endDate)
    this.firstStepper.get('time').setValue(values.time)
    this.firstStepper.get('location').setValue(values.location)
    this.firstStepper.get('slots').setValue(values.slots)
    this.firstStepper.get('lastBookingDate').setValue(values.lastBookingDate)
    this.firstStepper.get('price').setValue(values.price)
    this.firstStepper.get('description').setValue(values.description)
    this.firstStepper.get('banner').setValue(values.banner)
    this.firstStepper.get('_id').setValue(values._id)
    console.log(this.firstStepper.value)
  }
  fillarticle(value) {
    console.log(value)
    this.articleStepper.get('title').setValue(value.title)
    this.articleStepper.get('article').setValue(value.article)
    this.articleStepper.get('postedBy').setValue(value.postedBy)
    this.articleStepper.get('postedOn').setValue(value.postedOn)
    this.articleStepper.get('_id').setValue(value._id)
  }
  type : string
  data : string
  ngOnInit() {
    console.log(this.data)
  }
  display : string;
  genderList: string[] = ["Male", "Female", "other"];

  firstStepper = this._formBuilder.group({
    _id: [''],
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
    _id : [],
    title : ['', Validators.required],
    article : ['', Validators.required],
    postedBy: ['', Validators.required],
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
    if(this.firstStepper.valid) {
      if(this.update) {
        this.service.updateevent(this.firstStepper.value).subscribe((result)=>{
          console.log(result)
          this.dialogRef.close({result : true, data : 'updated'})
        })
      } else{
        console.log(this.firstStepper.value)
        this.service.addevent(this.firstStepper.value).subscribe((response)=>{
          console.log(response)
          this.dialogRef.close({result : true, data : 'saved'})
        })
      }
    } else{
      console.log("invalid")
      alert("Form input is invalid")
    }
  }
  submitarticle(){
    if(this.articleStepper.valid) {
      if(this.update) {
        this.service.updatearticle(this.articleStepper.value).subscribe((result)=>{
          console.log(result);
          this.dialogRef.close({result : true, data : 'updated'})
        })
      } else{
        this.service.addarticle(this.articleStepper.value).subscribe((response)=>{
          console.log(response)
          this.dialogRef.close({result : true, data : 'saved'})
        })
      }
    } else {
      console.log("invalid")
      alert("Form input is invalid")
    }
  }
  onFileChanged(event) {
    console.log(event)
    const file = event.target.files[0];
    console.log(file)
    this.selectedFile = event.target.files[0];
    const fd = new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name)
    
    this.sendfile = fd;
    this.firstStepper.get('banner').setValue(event.target.files[0])
  }
}
