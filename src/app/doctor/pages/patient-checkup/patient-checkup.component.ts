import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import Swal from "sweetalert2";
import { faAngry, faFlushed, faSmile } from "@fortawesome/free-solid-svg-icons";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";

declare var $: any;
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export interface TestElement {
  id: string;
  name: string;
  range: string;
  isTrue: boolean;
  result: string;
  status: number;
  isProfile: boolean;
  data: any;
  isExpanded: boolean;
}

@Component({
  selector: "app-patient-checkup",
  templateUrl: "./patient-checkup.component.html",
  styleUrls: ["./patient-checkup.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class PatientCheckupComponent implements OnInit {
  success: boolean = false;
  proccess: boolean;
  current_profile: String = "";
  code: String;
  current: number = 0;
  dataSource: TestElement[] = [];
  columnsToDisplay = ["name", "weight", "symbol", "position"];
  expandedElement: TestElement;
  angry = faAngry;
  smile = faSmile;
  sad = faFlushed;
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

  public lists: any[] = [
    { test: "Blood Test1", icon: "angry", class: "bg-danger" },
    { test: "Blood Test2", icon: "smile", class: "bg-success" },
    { test: "Blood Test3", icon: "purple", class: "bg-primary" },
    { test: "Blood Test4", icon: "sad", class: "bg-warning" },
    { test: "Blood Test5", icon: "smile", class: "bg-success" }
  ];

  //auto chips
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  packagesCtrl = new FormControl();
  medicalCtrl = new FormControl();
  vaccineCtrl = new FormControl();
  doctorCtrl = new FormControl();
  wellnessCtrl = new FormControl();
  filteredPackages: Observable<string[]>;
  filteredMedicals: Observable<string[]>;
  filteredDoctors: Observable<string[]>;
  filteredWellness: Observable<string[]>;
  filteredVaccines: Observable<string[]>;
  packages: string[] = [];
  medicals: string[] = [];
  doctors: string[] = [];
  wellness: string[] = [];
  vaccines: string[] = [];
  allPackages: string[] = [];
  allMedicals: string[] = [];
  allDoctors: string[] = [];
  allWelleness: string[] = [];
  allVaccines: string[] = [];

  @ViewChild("packagesInput", null) packagesInput: ElementRef<HTMLInputElement>;
  @ViewChild("medicalInput", null) medicalInput: ElementRef<HTMLInputElement>;
  @ViewChild("doctorInput", null) doctorInput: ElementRef<HTMLInputElement>;
  @ViewChild("vaccineInput", null) vaccineInput: ElementRef<HTMLInputElement>;
  @ViewChild("wellnessInput", null) wellnessInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto", null) matAutocomplete: MatAutocomplete;
  @ViewChild("mauto", null) mmatAutocomplete: MatAutocomplete;
  @ViewChild("vauto", null) vmatAutocomplete: MatAutocomplete;
  @ViewChild("wauto", null) wmatAutocomplete: MatAutocomplete;
  @ViewChild("dauto", null) dmatAutocomplete: MatAutocomplete;

  constructor(private http: HttpClient) {
    this.filteredPackages = this.packagesCtrl.valueChanges.pipe(
      startWith(null),
      map((packages: string | null) =>
        packages ? this._filter(packages) : this.allPackages.slice()
      )
    );
  }

  ngOnInit() {
    this.getTestList();
    this.getProfileTestList();
    this.getTestResults();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our packages
    if ((value || "").trim()) {
      this.packages.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
    this.packagesCtrl.setValue(null);
  }

  remove(packages: string): void {
    const index = this.packages.indexOf(packages);
    if (index >= 0) {
      this.packages.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.packages.push(event.option.viewValue);
    this.packagesInput.nativeElement.value = "";
    this.packagesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allPackages.filter(
      packages => packages.toLowerCase().indexOf(filterValue) === 0
    );
  }

  checkCode() {
    if (this.code.length <= 0) {
      return;
    }
    this.proccess = true;
    setTimeout(() => {
      if (this.code === "secret") {
        this.showNotification("success", 1);
        this.success = true;
        this.proccess = false;
      } else {
        this.showNotification("danger", 2);
        this.proccess = false;
      }
    }, 2000);
  }

  showNotification(type, type_no) {
    const msg =
      parseInt(type_no) == 1
        ? "Start Patient Checkup !"
        : "Wrong Patient Checkup Code !";

    $.notify(
      {
        icon: "notifications",
        message: "" + msg
      },
      {
        type: type,
        timer: 4000,
        placement: {
          from: "top",
          align: "right"
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>"
      }
    );
  }

  getTestList() {
    this.http
      .get("http://localhost:3000/tests/indvidualtest")
      .subscribe((data: any) => {
        if (data.success) {
          data.data.forEach(el => {
            if (el.prescribed_range)
              var range =
                el.prescribed_range.range_from +
                " - " +
                el.prescribed_range.range_to;
            this.dataSource.push({
              id: el._id,
              name: el.name,
              range: range,
              result: "",
              status: 0,
              isTrue: false,
              isProfile: false,
              data: "",
              isExpanded: false
            });
          });
        }
      });
  }

  getProfileTestList() {
    this.http
      .get("http://localhost:3000/tests/profiletest")
      .subscribe((res: any) => {
        if (res.success) {
          res.data.forEach(element => {
            let tests = [];
            element.indivisualTests.forEach(el => {
              if (el.prescribed_range)
                var range =
                  el.prescribed_range.range_from +
                  " - " +
                  el.prescribed_range.range_to;

              tests.push({
                name: el.name,
                range: range,
                result: "",
                status: 0
              });
            });
            this.dataSource.push({
              id: element._id,
              name: element.name,
              range: "",
              result: "",
              status: 0,
              isTrue: false,
              isProfile: true,
              data: tests,
              isExpanded: false
            });
            this.dataSource.forEach(el => {
              this.allPackages.push(el.name);
            });
          });
          // res.data
        }
      });
  }

  setToggle() {
    let el = document.getElementById("");
  }

  setStatus(i, status) {
    this.dataSource[i].status = status;
  }
  setStatusByInput(i) {
    // console.log(i);
    if (i == undefined) return;
    this.current = i;
    let nums = this.dataSource[this.current].range.split("-");
    if (nums.length < 2) return;
    let result = this.dataSource[this.current].result;

    if (
      parseInt(result) >= parseInt(nums[0]) &&
      parseInt(result) <= parseInt(nums[1])
    ) {
      this.dataSource[i].status = 4;
    } else if (
      parseInt(result) < parseInt(nums[0]) - 16 ||
      parseInt(result) > parseInt(nums[1]) + 16
    ) {
      this.dataSource[i].status = 1;
    } else if (parseInt(result) < parseInt(nums[0]) - 15) {
      this.dataSource[i].status = 2;
    } else if (parseInt(result) > parseInt(nums[1]) + 1) {
      this.dataSource[i].status = 2;
    } else {
      this.dataSource[i].status = 3;
    }
  }

  setProfileStatus(i, j, status) {
    this.dataSource[i].data[j].status = status;
  }

  setProfileStatusByInput(i, j) {
    if (i == undefined) return;
    let nums = this.dataSource[i].data[j].range.split("-");
    if (nums.length < 2) return;

    let result = this.dataSource[i].data[j].result;
    if (
      parseInt(result) >= parseInt(nums[0]) &&
      parseInt(result) <= parseInt(nums[1])
    ) {
      this.dataSource[i].data[j].status = 4;
    } else if (
      parseInt(result) < parseInt(nums[0]) - 16 ||
      parseInt(result) > parseInt(nums[1]) + 16
    ) {
      this.dataSource[i].data[j].status = 1;
    } else if (parseInt(result) < parseInt(nums[0]) - 15) {
      this.dataSource[i].data[j].status = 2;
    } else if (parseInt(result) > parseInt(nums[1]) + 1) {
      this.dataSource[i].data[j].status = 2;
    } else {
      this.dataSource[i].data[j].status = 3;
    }
  }

  changeDrawable(i) {
    this.dataSource[i].isExpanded = !this.dataSource[i].isExpanded;
    return;
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

  showPatientEMR() {}
  showPrescription() {
    Swal.fire("Prescription not uploaded");
  }
}
