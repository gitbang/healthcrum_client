import { Component, OnInit } from "@angular/core";
import {MatDialog} from "@angular/material"
import { CommonDashboardComponent } from 'app/shared/common-dashboard/common-dashboard.component';
import { faTheRedYeti } from "@fortawesome/free-brands-svg-icons";


@Component({
  selector: "app-e-prescription",
  templateUrl: "./e-prescription.component.html",
  styleUrls: ["./e-prescription.component.scss"],
})
export class EPrescriptionComponent implements OnInit {
  //tabBackground = "primary";
  public showPriscribtion = false;
  public analysis;
  public userZones : string[] = ["Red", "Purple", "Yellow", "Green"]
  public analysisInvestigation : string[] = ["Reason 1","Reason 2","Reason 3","Reason 4","Reason 5"]
  public analysisLRA : string[] = ["Reason 1","Reason 2","Reason 3","Reason 4","Reason 5"]
  public analysisPort : string 
  public investigationCheckbox : any;
  
  public lraFromOfUser =  { "Family History" : '15'}
  

  objectKeys = Object.keys;

  public userZone : string
  constructor(private dialog : MatDialog) {}

  ngOnInit() {
    this.analysis = false
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
