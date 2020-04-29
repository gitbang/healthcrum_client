import { Component, OnInit,  AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Chart, ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import Swal from "sweetalert2";
import { faAngry, faFlushed, faSmile } from "@fortawesome/free-solid-svg-icons";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { backgroundImage } from "html2canvas/dist/types/css/property-descriptors/background-image";
import { color } from "html2canvas/dist/types/css/types/color";


@Component({
  selector: 'app-common-dashboard',
  templateUrl: './common-dashboard.component.html',
  styleUrls: ['./common-dashboard.component.scss']
})
export class CommonDashboardComponent implements OnInit {
  angry = faAngry;
  smile = faSmile;
  sad = faFlushed;
  public picker1;
  public picker2;

  public lists: any[] = [
    { test: "Blood Test1", icon: "angry", class: "bg-danger" },
    { test: "Blood Test2", icon: "smile", class: "bg-success" },
    { test: "Blood Test3", icon: "purple", class: "bg-primary" },
    { test: "Blood Test4", icon: "sad", class: "bg-warning" },
    { test: "Blood Test5", icon: "smile", class: "bg-success" },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            offsetGridLines: true,
          },
        },
      ],
      yAxes: [{}],
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };

  public barChartLabels: Label[] = [
    [
      "1/3/2006",
      "1/3/2007",
      "1/3/2008",
      "1/3/2009",
      "1/3/2010",
      "1/3/2011",
      "1/3/2012",
    ],
  ];
  public barChartData: Array<ChartDataSets>[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public canvasWidth = 300;
  public needleValue = 65;
  public centralLabel = "High";
  public name = "Health Score";
  public div_rotate = "div-rotate";
  public top_status = {
    red: "red",
    green: "green",
    gy: "green-yellow",
    yellow: "yellow",
    ry: "yello-red",
  };
  // public bottomLabel = "65";
  public options = {
    hasNeedle: true,
    needleColor: "gray",
    needleUpdateSpeed: 1000,
    arcColors: ["green", "#4fe412", "yellow", "#dc8708", "rgb(255,0,0)"],
    arcDelimiters: [20, 40, 60, 80],
    rangeLabel: ["0", "20", "40", "60", "80", "100"],
    needleStartValue: 0,
  };

  constructor() {}

  ele = <HTMLCanvasElement> document.getElementById("linegraph")
  

  ngOnInit() {
    this.getTestResults();
    this.bigLineChart();  
    this.sideBargraph();
  }
  
  public getTestResults() {
    let i = 0;
    this.lists.forEach((el) => {
      let data = this.randomize();
      this.lists[i].icon = this.getEmojies(data[data.length - 1]);
      let colors = this.getColors(data);

      this.barChartData.push([
        {
          backgroundColor: colors,
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 1,
          data: data,
          label: el.test,
        },
      ]);
      i++;
    });
  }
  public randomize(): number[] {
    // Only Change 3 values
    return [
      Math.round(Math.random() * 100),
      -50,
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      -10,
      Math.round(Math.random() * 100),
    ];
    // this.barChartData[0].data = data;
  }

  getColors(values): string[] {
    let color = [];
    values.forEach((num) => {
      if (num < 50 && num > 0) color.push("green");
      else if (num < 70 && num >= 50) color.push("orange");
      else if (num < 90 && num >= 70) color.push("red");
      else if (num <= 100 && num >= 90) color.push("black");
    });
    return color;
  }

  getEmojies(num) {
    if (num < 50 && num > 0) return "smile";
    else if (num < 70 && num >= 50) return "sad";
    else if (num < 90 && num >= 70) return "angry";
    else if (num <= 100 && num >= 90) return "purple";
    else return "purple";
  }
  //
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

  @ViewChild('sidebarchart',{static: true}) barElement: ElementRef;
  sideBargraph(){
   var ctxL = this.barElement.nativeElement.getContext("2d");  
    var gradientFill = ctxL.createLinearGradient(0, 0, 0, 290);

    // gradientFill.addColorStop(0, "rgba(173, 53, 186, 1)");

    // gradientFill.addColorStop(1, "rgba(173, 53, 186, 0.1)");

    gradientFill.addColorStop(0, "rgba(255, 0, 0, 1)");

    gradientFill.addColorStop(1, "rgba(255, 0, 0, 0.1)");

    var myLineChart = new Chart(ctxL, {
      type: 'bar',
      data: {
        labels: ["Life-Style", "Physical", "Emotional", "Social", "Overall"],
        datasets: [
          {
            label: "Pysical",
            data: [0, 1, 2, 3],
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
        aspectRatio : 0.8,
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks : {
              autoSkip : false,
              fontColor : "white"
            },
            scaleLabel : {
              display : true,
              labelString : "Health ",
              fontColor : "white"
            }
          }],
          yAxes: [{
            gridLines: {
              display: true
            },
            ticks : {
              fontColor : "white"
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage (%)',
              fontColor : 'white'
            }
          }]
        }
      }
    });
  }

}
