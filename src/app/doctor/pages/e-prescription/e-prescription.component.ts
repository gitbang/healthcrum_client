import { Component, OnInit } from "@angular/core";
import {MatDialog} from "@angular/material"
import { CommonDashboardComponent } from 'app/shared/common-dashboard/common-dashboard.component';
import { faTheRedYeti } from "@fortawesome/free-brands-svg-icons";
import {FormBuilder} from '@angular/forms';


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
}
