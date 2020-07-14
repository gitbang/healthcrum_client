import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormArray, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { TestData, PerscriptionData, Report } from "../models/patient.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: "app-patient-ehr",
  templateUrl: "./patient-ehr.component.html",
  styleUrls: ["./patient-ehr.component.scss"],
})
export class PatientEhrComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router : Router,
    private localService : AuthServiceLocal
  ) {}

  //download section
  dtOptions: DataTables.Settings = {};
  reports: Report[] = [];
  crdate: number = Date.now();
  dtTrigger: Subject<any> = new Subject();

  fetchPerscriptionData(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
    };
    this.http
      .get("http://localhost:3000/dummy/data")
      //.map(this.extractData)
      .subscribe((reports: any[]) => {
        reports.forEach((element) => {
          this.reports.push({
            documentType: "Diagonist report",
            doctorName: element.firstName + element.lastName,
            testType: "Profile",
            tests: ["Hba1c", "CBC", "Blood Sugar"],
            testDate: new Date().toLocaleTimeString(),
            download_link: "http://localhost:3000/" + element.id,
            report_id: element.id,
          });
        });

        this.dtTrigger.next();
      });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: any) {
    return res.data || [];
  }

  downloadReport(reportId) {
    this._snackBar.open("Download started!", reportId, {
      duration: 2000,
    });
  }
  // upload section

  filteredDocuments: Observable<string>;
  selectedDocument: Observable<string>;
  selectedSubdocuments: Observable<String>;
  isPerscription_done: boolean = false;
  isTestDetail_done: boolean = false;
  perscriptionData: PerscriptionData = {
    medecines: [
      {
        medecine_name: "",
        morning_dose: "",
        noon_dose: "",
        night_dose: "",
        other_dose: "",
        remark: "",
        lunch: "",
        with: "",
        days: "",
      },
    ],
    recommendations: [],
  };

  testData: TestData = {
    testProfile: "",
    tests: [{ test_name: "", test_value: "" }],
    recommendations: [],
  };

  inutfile;
  document_type: string;
  myControl = new FormControl();
  date = new FormControl(new Date().toISOString());
  details = new FormGroup({
    location: new FormControl(),
    test_name: new FormControl(),
    doctor_name: new FormControl(),
    specialization: new FormControl(),
    documentType: new FormControl(),
    file: new FormControl(),
    disease: new FormControl(),
  });

  filteredOptions: Observable<string[]>;
  testOptions: Observable<string[]>;
  doctorOptions: Observable<string[]>;
  specilizationOptions: Observable<string[]>;
  documentTypeOptions: Observable<string[]>;
  diseaseOptions: Observable<string[]>;

  locations: string[] = [
    "jalandhar",
    "Mohali",
    "Chandigar",
    "Kapurthala",
    "phagwara",
  ];
  testname: string[] = ["blood", "ecg", "others"];
  doctorname: string[] = ["Mr lal", " Mr bawa", "Mr abc"];
  specialization: string[] = ["Heart", "Skin", "Lungs"];
  documents: string[] = ["Path report", "Diagonist report", "Prescription"];
  subdocument: string[] = ["CBC", "Blood Sugaring"];
  disease: string[] = ["Fever", "Cold", "Cough"];

  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role == 'doctor') {
      this.router.navigateByUrl('/login')
    }

    this.fetchPerscriptionData();
    this.autofillfunction();
    this.selectedDocument = this.details.get("documentType").valueChanges.pipe(
      startWith(""),
      map((value) => this.check(value))
    );
  }
  check(value: any): any {
    console.log(value);
  }

  // for location
  autofillfunction() {
    this.getlocation();
    this.gettestname();
    this.getdoctor();
    this.getspecilization();
    this.getdocumentType();
    this.getdisease();
  }

  getlocation() {
    this.filteredOptions = this.details.get("location").valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  gettestname() {
    this.testOptions = this.details.get("test_name").valueChanges.pipe(
      startWith(""),
      map((value) => this._filter1(value))
    );
    console.log(this.testOptions);
  }
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.testname.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getdoctor() {
    this.doctorOptions = this.details.get("doctor_name").valueChanges.pipe(
      startWith(""),
      map((value) => this._filter2(value))
    );
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.doctorname.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getspecilization() {
    this.specilizationOptions = this.details
      .get("specialization")
      .valueChanges.pipe(
        startWith(""),
        map((value) => this._filter3(value))
      );
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.specialization.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getdocumentType() {
    this.documentTypeOptions = this.details
      .get("documentType")
      .valueChanges.pipe(
        startWith(""),
        map((value) => this._filter4(value))
      );
  }
  private _filter4(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.documents.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getdisease() {
    this.diseaseOptions = this.details.get("disease").valueChanges.pipe(
      startWith(""),
      map((value) => this._filter6(value))
    );
  }
  private _filter6(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.disease.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  inputfile(event) {
    console.log(event);
  }
  submit() {
    console.log(this.myControl);
    console.log(this.details);
  }

  documentSelected(event: any) {
    if (event.includes("perscription")) {
      if (!this.isPerscription_done) this.openPerscriptionDialog();
    } else if (event.includes("diagnostice_report")) {
      if (!this.isTestDetail_done) this.openTestsDialog();
    }
  }
  openPerscriptionDialog(): void {
    const dialogRef = this.dialog.open(MedecineDetailFillDialog, {
      width: "95%",
      maxWidth: "100vw",
      data: this.perscriptionData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.perscriptionData = result;
      console.log(this.perscriptionData.medecines.length); //1
      console.log(result);
    });
  }

  openTestsDialog(): void {
    const dialogRef = this.dialog.open(TestDetailFillDialog, {
      width: "50%",
      maxWidth: "100vw",
      data: this.testData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.perscriptionData = result;
      console.log(this.testData.testProfile.length); //0
      console.log(result);
    });
  }
}

//medecine dialog---------------------------------------------------------------
@Component({
  selector: "patient-ehr-medecine",
  templateUrl: "patient-ehr-medecine.html",
})
export class MedecineDetailFillDialog {
  alert: boolean = false;
  addOnBlur = true;
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    public dialogRef: MatDialogRef<MedecineDetailFillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PerscriptionData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  dialogSubmit(): void {
    this.data.medecines.forEach((el) => {
      if (el.medecine_name != null) {
        if (
          el.morning_dose == "" ||
          el.night_dose == "" ||
          el.noon_dose == ""
        ) {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 2000);

          return;
        }
      }
    });
    if (!this.alert) this.dialogRef.close();
  }
  onAddClick(): void {
    this.data.medecines.push({
      medecine_name: "",
      morning_dose: "",
      noon_dose: "",
      night_dose: "",
      other_dose: "",
      remark: "",
      lunch: "",
      with: "",
      days: "",
    });
  }
  removeField(index): void {
    if (index > 0) {
      this.data.medecines.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.data.recommendations.push(value.trim());
    }
    if (input) {
      input.value = "";
    }
  }

  remove(recommend: string): void {
    const index = this.data.recommendations.indexOf(recommend);
    if (index >= 0) {
      this.data.recommendations.splice(index, 1);
    }
  }
}

//Test Dialog-------------------------------------------------------------
@Component({
  selector: "patient-ehr-test-details",
  templateUrl: "patient-ehr-test-details.html",
})
export class TestDetailFillDialog {
  alert: boolean = false;
  addOnBlur = true;
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    public dialogRef: MatDialogRef<MedecineDetailFillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TestData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  dialogSubmit(): void {
    this.data.tests.forEach((el) => {
      if (el.test_name != null) {
        if (el.test_value == "") {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 2000);

          return;
        }
      }
    });
    if (!this.alert) this.dialogRef.close();
  }
  onAddClick(): void {
    this.data.tests.push({
      test_name: "",
      test_value: "",
    });
  }
  removeField(index): void {
    if (index > 0) {
      this.data.tests.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.data.recommendations.push(value.trim());
    }
    if (input) {
      input.value = "";
    }
  }

  remove(recommend: string): void {
    const index = this.data.recommendations.indexOf(recommend);
    if (index >= 0) {
      this.data.recommendations.splice(index, 1);
    }
  }
}
