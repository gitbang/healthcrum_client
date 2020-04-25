import { Component, OnInit } from "@angular/core";
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
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  ngOnInit(){
  }
  constructor() {}
}
