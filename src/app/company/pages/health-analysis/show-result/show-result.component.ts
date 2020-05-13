import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatDialogRef} from '@angular/material'
import {Chart} from 'chart.js'

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss']
})
export class ShowResultComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<ShowResultComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.pieChart()
  }

  @ViewChild('piechart',{static: true}) lineElement: ElementRef;

  closeDialog(){
    this.dialogRef.close();
  }
  pieChart() {
    console.log("line chart reached")
    var ctxL = this.lineElement.nativeElement.getContext("2d");  
    var myLineChart = new Chart(ctxL, {
      type: 'pie',
  
      data: {
        labels : ['Red ', 'purple', 'yellow', 'green'],
        
       // labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            
            label: 'Feedback',
            data: [20 , 30, 25, 25 ],
            backgroundColor: ['#FFA1B5', '#86C7F3','#FFE29A', '#5dad60'],
            borderColor: [
            ],
           
          } 
        ]
      },
      options: {
        //aspectRatio : 0.5,
        responsive: true,
        scales: {
          /*
          xAxes: [{
               gridLines: {
                    display: false
               },
               ticks : {
                 autoSkip : false,
                 minRotation : 30 ,
                 maxRotation : 30,
                 fontColor : "white"
               }
            }],
          yAxes: [{
              gridLines: {
                display:false
              },
              ticks : {
                fontColor : "white"
              }     
            }]
          */
        }
      }
    });
  }
}
