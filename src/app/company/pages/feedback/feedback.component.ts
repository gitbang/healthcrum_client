import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import {CompanyService} from '../../company.service'

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

  constructor(
    private dialog : MatDialog,
    private _snackbar : MatSnackBar,
    private service : CompanyService
    
  ) { }

  feedbacks : feedback;
  data : any ;
  bad 
  avg
  goood
  better
  feedback : any
  ngOnInit() {
    // http call to fetch the data from background
    this.getDataFromBG()
    //this.feedbacks['bad'] = 10
  }

  getDataFromBG() {
    this.service.getFeedback().subscribe((result)=>{
      console.log(result);
      this.data = result
      this.bad = result.bad;
      this.avg = result.avg;
      this.goood = result.good;
      this.better = result.better
      this.feedback = [this.bad, this.avg, this.goood, this.better]
      console.log(this.feedback)
      this.pieChart()
    })
    
  }

  @ViewChild('piechart',{static: true}) lineElement: ElementRef;

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
            data: this.feedback,
            backgroundColor: ['#FFA1B5', '#86C7F3','#FFE29A', '#5dad60'],
            borderColor: [
            ],
           
          } 
        ]
      },
      options: {
        responsive: true,
        aspectRatio : 3,
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
  addfeedback(){
    console.log("give feedback");
    const feedback =this.dialog.open(AddFeedbackComponent)
    feedback.afterClosed().subscribe((response)=>{
      console.log(response)
      if(response.data) { 
        this._snackbar.open("Feedback" , "saved", {
          duration : 2000
        })
      }
    })
  }
  // piechartdata = [20, 30 , 25, 25]
  // piechartlabels =[ "first", 'second', "third", "fourth"]
  // pieChartType = "pie"
}
