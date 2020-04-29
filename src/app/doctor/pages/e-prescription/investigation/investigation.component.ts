import { Component, OnInit,  AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Chart, ChartOptions, ChartType, ChartDataSets } from "chart.js";

@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.scss']
})
export class InvestigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.bigLineChart();  
    this.bigLineChart2();
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
        labels: ["Today", "Yesterday", "Before 2 days"],
        datasets: [
          {
            label: "Blood Test",
            data: [65, 75, 72],
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
        title : {
            //text : 'Blood Test'
        },
        aspectRatio : 1.5,
        scales: {
          xAxes: [{
               gridLines: {
                   // display: false
               },
               ticks : {
                 autoSkip : false,
                 minRotation : 30 ,
                 maxRotation : 30,
                 fontColor : "black"
               }
            }],
          yAxes: [{
              gridLines: {
                display:false
              },
              ticks : {
                fontColor : "black",
                min : 50  ,
                stepSize : 10
              }     
            }]
          }
      }
    });
  }

  @ViewChild('biglinechart2',{static: true}) lineElement2: ElementRef;

  bigLineChart2() {
    var ctxL = this.lineElement2.nativeElement.getContext("2d");  
    var gradientFill = ctxL.createLinearGradient(0, 0, 0, 290);

    gradientFill.addColorStop(0, "rgba(255, 53, 0, 1)");

    gradientFill.addColorStop(1, "rgba(255, 53, 0, 0)");
    var myLineChart = new Chart(ctxL, {
      type: 'line',
      data: {
        labels: ["Today", "Yesterday", "Before 2 days"],
        datasets: [
          {
            label: "Sugar Test",
            data: [65, 75, 72],
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
        title : {
            //text : 'Blood Test'
        },
        aspectRatio : 1.5,
        scales: {
          xAxes: [{
               gridLines: {
                   // display: false
               },
               ticks : {
                 autoSkip : false,
                 minRotation : 30 ,
                 maxRotation : 30,
                 fontColor : "black"
               }
            }],
          yAxes: [{
              gridLines: {
                display:false
              },
              ticks : {
                fontColor : "black",
                min : 50  ,
                stepSize : 10
              }     
            }]
          }
      }
    });
  }

}
