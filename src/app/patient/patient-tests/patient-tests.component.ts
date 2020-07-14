import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import Swal from "sweetalert2";
import { faAngry, faFlushed, faSmile } from "@fortawesome/free-solid-svg-icons";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: "app-patient-tests",
  templateUrl: "./patient-tests.component.html",
  styleUrls: ["./patient-tests.component.scss"]
})
export class PatientTestsComponent implements OnInit {
  angry = faAngry;
  smile = faSmile;
  sad = faFlushed;

  public lists: any[] = [
    { test: "Blood Test1", icon: "angry", class: "bg-danger" },
    { test: "Blood Test2", icon: "smile", class: "bg-success" },
    { test: "Blood Test3", icon: "purple", class: "bg-primary" },
    { test: "Blood Test4", icon: "sad", class: "bg-warning" },
    { test: "Blood Test5", icon: "smile", class: "bg-success" }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            offsetGridLines: true
          }
        }
      ],
      yAxes: [{}]
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    }
  };

  public barChartLabels: Label[] = [
    [
      "1/3/2006",
      "1/3/2007",
      "1/3/2008",
      "1/3/2009",
      "1/3/2010",
      "1/3/2011",
      "1/3/2012"
    ]
  ];
  public barChartData: Array<ChartDataSets>[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  constructor(
    private router : Router,
    private localService : AuthServiceLocal
  ) {}

  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role != 'doctor') {
      this.router.navigateByUrl('/login')
    }
    this.getTestResults();
  }

  public chartClicked(
    {
      event,
      active
    }: {
      event: MouseEvent;
      active: {}[];
    },
    i: any
  ): void {
    Swal.fire({
      title: "<h4><strong>Download Test Report</strong></h4>",
      icon: "info",
      html:
        "You can download the <b>Test Report</b><br/>" +
        "<ul><li>Test Name : " +
        this.lists[i].test +
        "</li>" +
        "<li>Test Date : 1/3/200" +
        (i + 6) +
        "</li></ul>",

      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Download Now",
      cancelButtonText: "Not Now"
    }).then(result => {
      if (result.value) {
        let data = document.getElementById("report");
        // html2canvas =

        html2canvas(data).then(function(canvas) {
          let imgWidth = 208;
          let pageHeight = 295;
          let imgheight = canvas.height / canvas.width;
          let heightLeft = imgheight;
          const contentDataUrl = canvas.toDataURL("image/png");
          let pdf = new jsPDF();
          // pdf.addImage("/logo.png", "PNG", 0, 0, 200, 100);
          // pdf.text("Test Report", 0, 0);
          pdf.addImage(contentDataUrl, "PNG", 0, 0, 210, 297);
          pdf.save("report.pdf");
        });
        // Swal.fire("Success!", "Will be implemented soon.", "success");
      }
    });
    // console.log(event, active, i);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public getTestResults() {
    let i = 0;
    this.lists.forEach(el => {
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
          label: el.test
        }
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
      Math.round(Math.random() * 100)
    ];
    // this.barChartData[0].data = data;
  }

  getColors(values): string[] {
    let color = [];
    values.forEach(num => {
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

  getPrintCanvas() {
    return;
    `<table>
        <thead>
        <tr><td>Name</td><td>Date</td>/tr>
        </thead>
        <tbody><td>Test Name</td><td>12/12/2019</td></tr>
        </tbody>
      </table>`;
  }
}
