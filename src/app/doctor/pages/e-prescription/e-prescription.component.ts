import { Component, OnInit } from "@angular/core";
import {MatDialog} from "@angular/material"
import { CommonDashboardComponent } from 'app/shared/common-dashboard/common-dashboard.component';


@Component({
  selector: "app-e-prescription",
  templateUrl: "./e-prescription.component.html",
  styleUrls: ["./e-prescription.component.scss"],
})
export class EPrescriptionComponent implements OnInit {
  //tabBackground = "primary";
  public showPriscribtion = false;
  constructor(private dialog : MatDialog) {}

  ngOnInit() {}

  showprofile(){
    console.log("profile reached")
    const dialogRef  = this.dialog.open(CommonDashboardComponent, {  
      height : '80%'
    })
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog box closed`);
    });
  }
  
  priscription(){
    console.log("priscription reached")
    this.showPriscribtion = !this.showPriscribtion
  }
}
