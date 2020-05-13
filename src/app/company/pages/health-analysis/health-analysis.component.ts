import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { FormControl, FormBuilder } from "@angular/forms";
import {MatDialog} from '@angular/material'
import { ShowResultComponent } from "./show-result/show-result.component";

@Component({
  selector: "app-health-analysis",
  templateUrl: "./health-analysis.component.html",
  styleUrls: ["./health-analysis.component.scss"]
})
export class HealthAnalysisComponent implements OnInit {

  constructor( 
    private fb : FormBuilder,
    private dialog : MatDialog
  ) {}

  ngOnInit() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    var dailySalesChart = new Chartist.Line(
      "#dailySalesChart",
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);
  }
  
  toppings = new FormControl();
  toppingList: string[] = ["Delhi", "Mumbai", "UP", "punjab"];

  filterinp = this.fb.group({
    category : [''],
    subcategory :[''],
    year : [''],
    age : [''],
    gender : ['']
  })

  menulist : string[]= ['Package Wise', 'Department Wise', 'Disease Wise', 'Service Wise']
  
  sublist = {
    packagelist :['Package 1', 'package2', 'package3', 'package4', 'package5'],
    departmentlist :  ['department10','department 2','department 3','department 4','department 5'],
    diseaselist : ['Disease 1','Disease 2','Disease 3','Disease 4','Disease 5'],
    servicelist : ['Service 1','Service 2','Service 3','Service 4','Service 5', ]  
  }
  years : string  [] = ["2020", "2019", "2018", "2017"]

  list = [
    {name : 'Department Wise', value : 'departmentlist'},
    {name : 'Disease Wise', value : 'diseaselist'},
    {name : 'Package Wise', value : 'packagelist'},
    {name : 'Service Wise', value : 'servicelist'},
  ]

  current : Array<string> = []
  filter() {
    console.log(this.filterinp.value)
    this.dialog.open(ShowResultComponent)
  }
  changelist(event){
    console.log(event)
    console.log("reached")

    this.current = this.sublist[event.value]
    console.log(this.current)
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function(data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    });

    seq2 = 0;
  }
  
}
