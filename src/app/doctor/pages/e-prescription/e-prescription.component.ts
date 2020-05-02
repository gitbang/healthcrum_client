import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {MatDialog} from "@angular/material"
import { CommonDashboardComponent } from 'app/shared/common-dashboard/common-dashboard.component';
import { faTheRedYeti } from "@fortawesome/free-brands-svg-icons";
import {FormBuilder, FormArray, FormControl, FormGroup} from '@angular/forms';
import {LastConsultantComponent} from './last-consultant/last-consultant.component'
import { AnalysisComponent } from "./analysis/analysis.component";
// import {LastConsultantComponent} from 'pages/e-prescription/last-consultant/last-consultant.component

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
  @ViewChild('analysisZone', {static : true}) zonearea : ElementRef

  moveToZone() {
    //this.zonearea.nativeElement.scrollIntoView
    this.zonearea.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

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
     { "Family History" : '20'},
     { "Dietry " : '25'},
     { "Physical" : '26'},
     { "Family Background" : '50'},
  ]

  public userdetail = {
    "Physical" : [
      {
        "Question" : "Do you exercise ?",
        "Zone" : "Red",
        "ans" : "No"
      },
      {
        "Question" : "Do you drink alcohol?",
        "Zone" : "Red",
        "ans" : "yes"
      },
      {
        "Question" : "Do you smoke ?",
        "Zone" : "Green",
        "ans" : "No"
      }
    ]
  }

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

  // formSecond = this.fb.group({
  //   medication : this.fb.group({
  //     medicine : [''],
  //     dose : [''],
  //     timing : [''],
  //     duration : ['']
  //   }),
  //   investigation : [''],
  //   recommendation : ['']
  // })

  // dynamic form second

  formSecond2 = this.fb.group({
    medication : this.fb.array([
      this.addmedicine()
    ]),
    investigation : [''],
    recommendation : ['']
  })

  addmedicineButtonClick(): void {
    (<FormArray>this.formSecond2.get('medication')).push(this.addmedicine())
    console.log(this.formSecond2.value)
  }

  removeMedicineClick(i : number) : void {
    (<FormArray>this.formSecond2.get('medication')).removeAt(i);
  }
  addmedicine() : FormGroup{
    return this.fb.group({
      medicine : [''],
      dose : [''],
      timing : [''],
      duration : ['']
    })
  }
    // dynamic form second ends

    // form builder ends
  
  submit(){
    console.log("submit clicked");
    console.log("first form",this.formFirst);
    console.log("dynamic form",this.formSecond2);
    
  }
  togglefun(event) {
    console.log(event);
    this.userZone = event.value;
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
    this.analysis = true
  }


  onTabChanges(event){  
    //this.analysis = true;
    console.log(event);
    if(event.index == 0) {
      this.analysis = false;
      this.analysisPort = "none"
    }  
    else{
      this.userZone = event.tab.textLabel;
      const dialogRef = this.dialog.open(AnalysisComponent, {
        height : '80%',
        width : "500px",
        data : {
          zone : this.userZone
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log("result is : " , result)
      })
    }
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
  
 /* myForm = this.fb.group({
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
  }
  submitreason(){
    console.log(this.formReasonObj)
    //console.log("form array", this.formReson['lra'].value)
    //this.formReson.controls['lra'].setValue(this.checkbox)
  }
  */
  
  showlastconsultant(){
    console.log("last consultant reached")
    const dialogRef  = this.dialog.open(LastConsultantComponent, {  
      height : '80%',
    })
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog box closed`, result);
    })
  }

  checkzone(value){
    console.log(value)
    if(value < 20 ) {
    
    }
    return true
  }
}
