import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {MatDialog} from "@angular/material"
import { CommonDashboardComponent } from 'app/shared/common-dashboard/common-dashboard.component';
import { faTheRedYeti } from "@fortawesome/free-brands-svg-icons";
import {FormBuilder, FormArray, FormControl} from '@angular/forms';


@Component({
  selector: "app-e-prescription",
  templateUrl: "./e-prescription.component.html",
  styleUrls: ["./e-prescription.component.scss"],
})
export class EPrescriptionComponent implements OnInit {
  //tabBackground = "primary";
  
  
  constructor(private dialog : MatDialog, private fb : FormBuilder) {}

  ngOnInit() {
    this.analysis = false
  }

  objectKeys = Object.keys;

  public userZone : string

  public showPriscribtion = false;
  public analysis;
  public userZones : string[] = ["Red", "Purple", "Yellow", "Green"]
  public analysisInvestigation : string[] = ["Reason 1","Reason 2","Reason 3","Reason 4","Reason 5"]
  public analysisLRA : string[] = ["Reason 1","Reason 2","Reason 3","Reason 4","Reason 5"]
  public analysisPort : string 
  public investigationCheckbox : any;
  
  public lraFromOfUser =  { "Family History" : '15'}
  public lraFromOfUser1 = [
     { "Family History" : '15'},
     { "Dietry " : '15'},
     { "Physical" : '15'},
     { "Family Background" : '15'},
    ]
    @ViewChild('togglegroup', {static : false}) toggle : ElementRef
    // form builder of this page
    
    formFirst = this.fb.group({
      problem : this.fb.group({
        description : [''],
        remarks : ['']
      }),
      symptoms : this.fb.group({
        description : [''],
        remarks : ['']
      }),
      finding: this.fb.group({
        description : [''],
        remarks : ['']
      }),
      recommendation : this.fb.group({
        description : [''],
        remarks : ['']
      }),
    })

    formSecond = this.fb.group({
      medication : this.fb.group({
        medicine : [''],
        dose : [''],
        timing : [''],
        duration : ['']
      }),
      investigation : [''],
      recommendation : ['']
    })
  
    // form builder ends
  
  submit(){
    console.log("submit clicked");
    console.log(this.formFirst.value);
    console.log(this.formSecond)
    console.log(this.toggle.nativeElement.value)
  }
  togglefun(event) {
    console.log(event);
    this.userZone = event.value;
  }

  getbackgroungcolor(color : string) {
  }
  getInkColor(tabRef){
    // if(tabRef == 0) {
    //   return 'primary'
    // }
    // else if(tabRef == 1) {
    //   return 'accent'
    // }
    switch(tabRef){
      case 0 : return 'primary';
      case 1 : return 'accent';
      case 2 : return 'warn';
      case 3 : return '';
      case 4 : return 'green';
    }
  }

  showprofile(){
    console.log("profile reached")
    const dialogRef  = this.dialog.open(CommonDashboardComponent, {  
      height : '80%',
    })
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog box closed`);
    });
  }
  
  investigation(){
    console.log("priscription reached")
    this.showPriscribtion = !this.showPriscribtion
  }
  analysisPart(){
    console.log("analysis");
  }
  onTabChanges(event){
    
    this.analysis = true;
    
    console.log(event);
    if(event.index == 0) {
      this.analysis = false;
      this.analysisPort = "none"
    }  
    else{
      this.userZone = event.tab.textLabel;
    }
  }
  checkBoxValueChange(event){
    console.log("checkbox ")
    console.log(event)
  }
  lraSection() {
    console.log("lra reached")
  }
  analysisSection(section: string){
    this.analysisPort = section;
    console.log(this.analysisPort)
  }
  check(temp :any){
    console.log(temp.value.property )
  }
  
  myForm = this.fb.group({
    lracheckbox: this.fb.array([''])
  });
  
  formReson = this.fb.group({
    lra  : this.fb.array([])
  })

  formReasonObj = {
    lra : [],
    investigation : [],
    recommendation : []
  }
  checkCheckBoxvalue(key , event){
    
    if(event == true) {
      this.formReasonObj.lra.push(key)
    }
    else{
      this.formReasonObj.lra = this.formReasonObj.lra.filter((x)=> x!= key)
    }
    console.log(this.formReasonObj)
    /*
    //console.log(key, event)
    const formarray = this.fb.array([
      new FormControl('akash')
    ])
    //console.log("before", formarray.value)
    formarray.push(new FormControl(key))
    // //console.log("after", formarray.value)
    // this.myForm5.controls['lra'].value.push(key)
    // console.log(this.myForm5.controls['lra'].value)
    if(event == true) {
      this.formReson.controls['lra'].value.push(key)
    }
    else{
      //this.formReson.controls['lra'] = this.formReson.controls['lra'].value.filter((x)=> x!= key)
      let temp = this.formReson.controls['lra'].value.filter((x)=> x!= key);
      this.formReson.controls['lra'].value.setValue(temp) 
    }
    console.log(this.formReson.controls['lra'])
    */
    
  }
  submitreason(){
    console.log(this.formReasonObj)
    //console.log("form array", this.formReson['lra'].value)
    //this.formReson.controls['lra'].setValue(this.checkbox)
  }

}
