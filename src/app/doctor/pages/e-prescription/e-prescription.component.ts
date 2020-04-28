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
  public userZone : string[] = ["Red", "Purple", "Yellow", "Green"]
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
  
  priscription(){
    console.log("priscription reached")
    this.showPriscribtion = !this.showPriscribtion
  }
  analysisPart(){
    console.log("analysis");
    this.analysis = true
  }
}
