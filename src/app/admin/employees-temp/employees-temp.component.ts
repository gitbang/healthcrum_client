import { Component, OnInit } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-employees-temp",
  templateUrl: "./employees-temp.component.html",
  styleUrls: ["./employees-temp.component.scss"],
})
export class EmployeesTempComponent implements OnInit {
  companies: any[] = [];
  branches: any[] = [];
  days: any[] = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 1 },
    { name: "Tuesday", value: 2 },
    { name: "Wednesday", value: 3 },
    { name: "Thrusday", value: 4 },
    { name: "Friday", value: 5 },
    { name: "Saturday", value: 6 },
  ];
  selectedDay: any[] = [];
  biweekly;
  companySelected: String;
  branchSelected: String;
  date = new FormControl(new Date());
  temperatureData: any[] = [];
  dataLoading: boolean = true;
  dateEnabled: boolean = false;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllCorporate().subscribe((res) => {
      if (res.success) {
        this.dataLoading = false;
        this.companies = res.data;
      }
    });
    this.getWeeklySetting();
  }

  findData() {
    let data = {
      corporate_id: this.companySelected,
      branch_id: this.branchSelected,
    };
    this.adminService.getTemperatureByBranch(data).subscribe((res: any) => {
      this.temperatureData = [];
      if (res.success) {
        let tempData = [];
        let empId = [];
         
        res.data.forEach(emp => {
          empId[emp.userId] = {
            employeeId : emp.employeeId,
            name : emp.name,
            dept_name: emp.departmentId.name
          }
        });
        let keys = Object.keys(empId);
        res.temperature.forEach((temp) => {
          this.temperatureData.push({
            temperature: temp.temperature,
            empName: empId[temp.userId].name,
            empid: empId[temp.userId].employeeID,
            department: empId[temp.userId].dept_name,
            createdAt: temp.createdAt,
          });
          if(temp.temeperature > 98.5)
            tempData.push(parseFloat(temp.temperature));
        });
        this.barChartData = [
          {
            data: tempData,
            label: "Employees Temperatures",
            backgroundColor: this.getColors(tempData),
          },
        ];
        this.barChartLabels = keys;
      }
    });
  }

  getBranches() {
    this.adminService
      .getBranchesByCorporate({ corporate_id: this.companySelected })
      .subscribe((res: any) => {
        if (res.success) {
          this.branches = res.data;
        } else {
          console.log(res);
          alert("Failed to find Branches");
        }
      });
  }

  getEmployeeTemperature() {
    this.adminService.getTemperatures().subscribe((res: any) => {
      this.temperatureData = [];
      if (res.success) {
        let tempData = [];
        let empId = [];
        res.data.forEach(emp => {
          empId[emp.userId] = {
            employeeId : emp.employeeId,
            name : emp.name,
            dept_name: emp.departmentId.name
          }
        });
        let keys = Object.keys(empId);
        res.temperature.forEach((temp) => {
          this.temperatureData.push({
            temperature: temp.temperature,
            empName: empId[temp.userId].name,
            empid: empId[temp.userId].employeeID,
            department: empId[temp.userId].dept_name,
            createdAt: temp.createdAt,
          });
          if(temp.temeperature > 98.5)
            tempData.push(parseFloat(temp.temperature));
        });
        this.barChartData = [
          {
            data: tempData,
            label: "Temperature data",
            backgroundColor: this.getColors(tempData),
          },
        ];
        this.barChartLabels = keys;
      }
    });
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
  //chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
  ];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  branchSet() {
    this.dateEnabled = true;
  }
  dateChange() {
    if (!this.dateEnabled) {
      alert("Please select corporate and branch");
      return;
    }
    let data = {
      corporate_id: this.companySelected,
      branch_id: this.branchSelected,
      filter_date: new Date(this.date.value).toLocaleDateString(),
    };
    this.adminService.getTemperatureByDate(data).subscribe((res: any) => {
      this.temperatureData = [];
      if (res.success) {
        let tempData = [];
        let empId = [];
        res.data.forEach(emp => {
          empId[emp.userId] = {
            employeeId : emp.employeeId,
            name : emp.name,
            dept_name: emp.departmentId.name
          }
        });
        let keys = Object.keys(empId);
        res.temperature.forEach((temp) => {
          this.temperatureData.push({
            temperature: temp.temperature,
            empName: empId[temp.userId].name,
            empid: empId[temp.userId].employeeID,
            department: empId[temp.userId].dept_name,
            createdAt: temp.createdAt,
          });
          if(temp.temeperature > 98.5)
            tempData.push(parseFloat(temp.temperature));
        });
        this.barChartData = [
          {
            data: tempData,
            label: "Employees Temperature",
            backgroundColor: this.getColors(tempData),
          },
        ];
        this.barChartLabels = keys;
      }
    });
  }

  saveWeeklySettings() {
    console.log(this.selectedDay);
    if (this.selectedDay.length < 0 || this.selectedDay == undefined) {
      return;
    }
    let data = {
      days: this.selectedDay,
      biweekly: false,
    };
    this.adminService.saveWeeklySettings(data).subscribe((res: any) => {
      if (res.success) {
        alert("Setting saved successfully");
      } else {
        alert(res.message);
      }
    });
  }

  getWeeklySetting() {
    this.adminService.getWeeklySettings().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        res = res.data[0];
        this.selectedDay = res.days;
        // this.biweekly = res.biweekly == "false" ? false : true;
      } else {
        alert(res.message);
      }
    });
  }
}
