import { Component, OnInit } from '@angular/core';
import {FormControl, FormArray, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { DatePipe } from '@angular/common';
//import {DatePipe} from '@angular/common'
@Component({
  selector: 'app-patient-ehr',
  templateUrl: './patient-ehr.component.html',
  styleUrls: ['./patient-ehr.component.scss']
})
export class PatientEhrComponent implements OnInit {
  // myDate : Date = new Date();
  // public dt  : String
  constructor(private datePipe: DatePipe) {    
  }
  public dt = new Date();
  myDate
  current_rows = 1;
  rows_array : Array<number>
  myControl = new FormControl();

  details = new FormGroup({
    date : new FormControl(),
    location : new FormControl(),
    test_name : new FormControl(),
    doctor_name : new FormControl(),
    specialization : new FormControl(),
    documentType : new FormControl(),
    subDocument : new FormControl(),
    file : new FormControl,
    disease : new FormControl()
  })

  
  filteredOptions: Observable<string[]>;
  testOptions: Observable<string[]>;
  doctorOptions: Observable<string[]>;
  specilizationOptions: Observable<string[]>;
  documentTypeOptions: Observable<string[]>;
  subDocumentOptions: Observable<string[]>;  
  diseaseOptions: Observable<string[]>;

  locations: string[] = ['jalandhar', 'Mohali', 'Chandigar', "Kapurthala", "phagwara"];
  testname : string[] = ["blood", "ecg", "others"]
  doctorname : string[] = ["Mr lal", " Mr bawa", "Mr abc"]
  specialization : string[] = ["Heart", "Skin", "Lungs"]
  documents : string[] = ["Path report","Diagonist report", "Prescription" ]
  subdocument : string[] = ["CBC","Blood Sugaring" ]
  disease : string[] = ["Fever", "Cold", "Cough"]

  ngOnInit() {
    
    this.generateRows();
    this.myDate = this.datePipe.transform(this.dt, 'yyyy-MM-dd');
    this.autofillfunction();
  
    
  }

  // generate rows
  generateRows(){
    this.rows_array = Array(this.current_rows).fill(0).map((x,i)=>i); // [0,1,2,3,4]
    console.log(this.rows_array)
  }

  // for location
  autofillfunction() {
    this.getlocation();
    this.gettestname();
    this.getdoctor();
    this.getspecilization();
    this.getdocumentType();
    this.getsubdocumentType();
    this.getdisease();
  }

  getlocation() {
    this.filteredOptions = this.details.get("location").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(option => option.toLowerCase().includes(filterValue));
  }
  gettestname() {
    this.testOptions = this.details.get("test_name").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter1(value))
      )
      console.log(this.testOptions)
  }
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.testname.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  

  getdoctor() {
    this.doctorOptions = this.details.get("doctor_name").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter2(value))
      );
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.doctorname.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  
  getspecilization() {
    this.specilizationOptions= this.details.get("specialization").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter3(value))
      )
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.specialization.filter(option => option.toLowerCase().includes(filterValue));
  }

  getdocumentType() {
    this.documentTypeOptions= this.details.get("documentType").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter4(value))
      )
  }
  private _filter4(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.documents.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  getsubdocumentType() {
    this.subDocumentOptions= this.details.get("subDocument").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter5(value))
      )
  }
  private _filter5(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.subdocument.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  getdisease() {
    this.diseaseOptions= this.details.get("disease").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter6(value))
      )
  }
  private _filter6(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.disease.filter(option => option.toLowerCase().includes(filterValue));
  }

  inputfile(event) {
    console.log(event)
  }
  submit(){
    console.log(this.myControl)
    console.log(this.details)
  }
};
