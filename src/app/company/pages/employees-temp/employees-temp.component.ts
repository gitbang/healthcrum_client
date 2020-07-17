import { Component, OnInit, Inject } from "@angular/core";
import { EmployeeTemperature } from '../../modal/employeeTemperature';
import { Subject } from 'rxjs';
import * as Chartist from 'chartist';
import { ActivatedRoute, Router } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CompanyService } from "app/company/company.service";
import { AuthServiceLocal } from "app/services/auth-service.service";

@Component({
  selector: "app-employees-temp",
  templateUrl: "./employees-temp.component.html",
  styleUrls: ["./employees-temp.component.scss"],
})
export class EmployeesTempComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: EmployeeTemperature[] = [];
  temperatureData:any[] = [];
  length:number;
  pageSize:number = 10;
  pageSizeOptions = [5, 10, 25, 100];
  type;
  empIDs = {};
  dtTrigger: Subject<EmployeeTemperature> = new Subject();
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog, private corporateService: CompanyService,
    private authLocal: AuthServiceLocal,
    private router: Router
    ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get("type");
    })
    this.getAllTemperature();
    this.dtOptions.paging = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    //this.getEmployeeData(10,80,20);
    // this.viewChart();
  }

  showDetails(empId,empName){
    let data = [];
    this.openDialog(empId,empName,data);
  }
  openDialog(empId,empName,empData): void {
    const dialogRef = this.dialog.open(EmployeeTemperatureDetailDailog, {
      width: '80%',
      data: {empId:empId,empName:empName,empdata: empData}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getAllTemperature(){
    let data = {
      corporate_id: this.authLocal.getUserCorporateID,
      branch_id: this.authLocal.getUserBranchID,
    };
    this.corporateService.getAllTemperatures(data).subscribe((res:any)=>{
      console.log(res);
        if (res.success) {
          res.data.forEach(emp => {
            this.empIDs[emp.userId] = {
              employeeId : emp.employeeId,
              name : emp.name,
              dept_name: emp.departmentId.name
            }
          });
          res.temperature.forEach((temp) => {
            try{
            this.temperatureData.push({
              user_id: temp.user_id,
              empId: this.empIDs[temp.user_id].employeeId,
              empName:this.empIDs[temp.user_id].name,
              temperature: temp.temperature,
              department: this.empIDs[temp.user_id].dept_name,
              createdAt: temp.createdAt,
            });
          }catch(err){
            this.temperatureData.push({
              user_id: temp.user_id,
              empId: "not available",
              empName: "not available",
              temperature: temp.temperature,
              department: "not available",
              createdAt: temp.createdAt,
            });
          }
          });
          this.dataToShow(this.type);
        }
    })
  }

  dataToShow(type){
    if(type=='danger'){
      let temp = [];
      this.temperatureData.forEach(el=>{
        if(el.temperature > 98.5){
          temp.push(el);
        }
      });
      this.temperatureData = temp;
    }else if(type=='no-entry'){
      let keys = Object.keys(this.empIDs);
      let temp = [];
      
      this.temperatureData.forEach(el=>{
        if(keys.includes(el.user_id)){
          const index = keys.indexOf(el.user_id);
          if (index > -1) {
            keys.splice(index, 1);
          }
        }
      });

      for(let i=0;i<keys.length;i++){
        try{
          temp.push({
          user_id: keys[i],
          empId : this.empIDs[keys[i]].employeeId,
          department : this.empIDs[keys[i]].departmentId.name,
          empName: this.empIDs[keys[i]].name,
          temperature : 0,
          createdAt: 0
        })
        }catch(err){
          console.log(keys[i]);
          temp.push({
          user_id: keys[i],
          empId : this.empIDs[keys[i]].employeeId,
          department : this.empIDs[keys[i]].dept_name,
          empName: this.empIDs[keys[i]].name,
          temperature : 0,
          createdAt: 0
        })
        }
        
      }
      this.temperatureData = temp;
    }else if(type=='safe'){
      let temp = [];
      this.temperatureData.forEach(el=>{
        if(el.temperature <= 98.5){
          temp.push(el);
        }
      });
      this.temperatureData = temp;
    }
    this.dtTrigger.next();
  }

  // chart confifgurations
  startAnimationForBarChart(chart){
    let seq2: any, delays2: any, durations2: any;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if(data.type === 'bar'){
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });
    seq2 = 0;
};


  viewChart(){
    var datawebsiteViewsChart = {
      labels: this.persons.map((el)=>el.empId),
      series: [
        this.persons.map((el)=> el.empTemperature)
      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 120,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#tempChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
    this.startAnimationForBarChart(websiteViewsChart);
  }
}

@Component({
  selector: 'employee-teperature-deatils',
  templateUrl: 'employee-teperature-deatils.html',
})
export class EmployeeTemperatureDetailDailog implements OnInit {

  anySelected:boolean = false;
  showAnswers:boolean = false;
  showData:boolean = false;
  answerBG = 0;
  temperatureBG = false;
  temperatureData = [];
  covidAnswers:any[];
  weeklyAnswers:any[];
  answerStatus:String;

  constructor(
    public dialogRef: MatDialogRef<EmployeeTemperatureDetailDailog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private corporateService: CompanyService) {}

  ngOnInit(): void {
    this.getEmpCovidAnswers();
    let data = {
      user_id: this.data.empId
    };
    this.corporateService.getEmpTodayTemperatures(data).subscribe((res:any)=>{
      this.temperatureData = [];
    if (res.success) {
      res.temperature.forEach((temp) => {
        if(temp.temperature > 98.5) this.temperatureBG = true;
        this.temperatureData.push({
          temperature: temp.temperature,
          createdAt: temp.createdAt,
        });
      });
    }
  });
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.showAnswers = false;
    this.showData = false;
    this.anySelected = false;
  }

  setSelected(num:number){
    this.anySelected = true;
    if(num == 1){
      this.showAnswers = true;
    }else{
      this.showData = true;
    }
  }

  dateChange(event){
    let data = {
      user_id: this.data.empId,
      filter_date: {begin: new Date(event.value.begin).toLocaleDateString(), end: new Date(event.value.end).toLocaleDateString()}
    };
    this.corporateService.getRangeTemperatures(data).subscribe((res: any) => {
      this.temperatureData = [];
      if (res.success) {
        res.temperature.forEach((temp) => {
          this.temperatureData.push({
            temperature: temp.temperature,
            createdAt: temp.createdAt,
          });
        });
      }
    });
  }

  getEmpCovidAnswers(){
    let data = {
      user_id: this.data.empId
    };
    this.corporateService.getEmpCovidAnswers(data).subscribe((res:any)=>{
        if(res.success){
          if(res.data.length > 0){
        let surveyAnswer = JSON.parse(res.data[0].answers);
        let weeklyAnswer = JSON.parse(res.data[0].weeklyAns);
        this.covidAnswers = surveyAnswer.answers;
        this.weeklyAnswers = weeklyAnswer.answers;
        if(surveyAnswer.status == "danger" || weeklyAnswer.status == "danger")
        this.answerBG = 1;
        else if(surveyAnswer.status == "purple" || weeklyAnswer.status == "purple")
        this.answerBG = 2;
          }else{
            this.dialogRef.close();
            alert("Employee has not answered any Questioneries");
          }
        }else{
          this.dialogRef.close();
          alert("Employee has not answered any Questioneries");
        }
    })
  }

}