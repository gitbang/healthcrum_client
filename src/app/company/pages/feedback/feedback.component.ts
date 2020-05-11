import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartOptions, ChartType, ChartDataSets } from "chart.js";


export interface feedback  {
    bad : number,
    average : number,
    good : number,
    better : number
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor() { }

  feedback : feedback;
  ngOnInit() {
    // http call to fetch the data from background
    this.feedback.bad = 20;
    this.feedback.average = 30;
    this.feedback.good = 25;
    this.feedback.better = 25
    this.bigLineChart()
  }


  @ViewChild('biglinechart',{static: true}) lineElement: ElementRef;

  bigLineChart() {
    var ctxL = this.lineElement.nativeElement.getContext("2d");  
    var gradientFill = ctxL.createLinearGradient(0, 0, 0, 290);

    gradientFill.addColorStop(0, "rgba(255, 53, 0, 1)");

    gradientFill.addColorStop(1, "rgba(255, 53, 0, 0)");
    var myLineChart = new Chart(ctxL, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "User Active",
            data: [0, 65, 45, 65, 35, 65, 0],
            backgroundColor: gradientFill,
            borderColor: [
              '#AD35BA',
            ],
            borderWidth: 2,
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(173, 53, 186, 0.1)",
          } 
        ]
      },
      options: {
        responsive: true,
        aspectRatio : 3,
        scales: {
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
          }
      }
    });
  }
  
  piechartdata = [20, 30 , 25, 25]
  piechartlabels =[ "first", 'second', "third", "fourth"]
  pieChartType = "pie"
}
