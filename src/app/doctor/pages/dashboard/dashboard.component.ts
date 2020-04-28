import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state} from '@angular/animations';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { zIndex } from 'html2canvas/dist/types/css/property-descriptors/z-index';
import {MatDialog} from "@angular/material"
import { CommonDashboardComponent } from 'app/shared/common-dashboard/common-dashboard.component';


type Orientation = ("doctor" | "patient")
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations : [
 /*   trigger("toLeft",
      [
        state('patient', style({
          opacity : 1,
          transform : 'translateY(50%)',
          zIndex : -1 ,
        })),
        state('patient', style({
          transform : 'translateX(-50%)',
          display : "none !important" ,
          zIndex : -1
        })),
        transition("doctor <=> patient", 
          [ 
            animate(2000)
          ]
        )
      ]
    
    )*/
  ]
})
export class DashboardComponent implements OnInit {
  public orientation: Orientation;
  public showPriscribtion = false;
  constructor( private dialog : MatDialog) {
    this.orientation = "doctor"
  }

  ngOnInit() {
    this.orientation = "doctor"
  }
  public value  = 500
  changescreen(){
    console.log("change screen reached")
    
    if(this.orientation == "doctor") 
    {  this.orientation ="patient";
        this.value = 500;  
    }
    else
      this.orientation = "doctor"
  }
  
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
