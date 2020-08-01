import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {MatDialog} from "@angular/material"
import { CommonDashboardComponent } from 'app/shared/common-dashboard/common-dashboard.component';
import { faTheRedYeti } from "@fortawesome/free-brands-svg-icons";
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {LastConsultantComponent} from './last-consultant/last-consultant.component'
import { AnalysisComponent } from "./analysis/analysis.component";
import {AuthServiceLocal} from '../../../services/auth-service.service'
import {Router,  ActivatedRoute} from '@angular/router'
// import {LastConsultantComponent} from 'pages/e-prescription/last-consultant/last-consultant.component4
import {DoctorService} from '../../doctor.service'
import Swal from "sweetalert2";
import {HomeServiceService} from '../../../home/home-service.service'
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface test {
  name : string,
  testId : string,
  testType : string
}

@Component({
  selector: "app-e-prescription",
  templateUrl: "./e-prescription.component.html",
  styleUrls: ["./e-prescription.component.scss"],
})



export class EPrescriptionComponent implements OnInit {
  //tabBackground = "primary";
  
  
  constructor(
    private dialog : MatDialog, 
    private fb : FormBuilder, 
    private service : DoctorService,
    private localService : AuthServiceLocal,
    private router : Router,
    private route : ActivatedRoute,
    private homeService : HomeServiceService
    ) {}

  hraReasonBox : any;
  hraReasonAnswer : any
  expansionCard : any;
  date : string;
  controls;
  sideExpansion = {
    disease : 'All about present disease',
    medicine : "all about present medicine",
    allergy : 'all about present allergy',
    others : "other hazardous factors"
  }

  doctorId: string = "";
  ngOnInit() {

    let role = this.localService.getUserRole();
    if(role != 'doctor') {
      this.router.navigateByUrl('/login')
      return
    }
    // get doctor Id 
    this.getDoctorId()

    //get query parameters
    this.getquertParameters()

    // get hra details//
    //this.getHraDetails()
    
    // generate form group
    this.getFormGroup();

    // get all blood test; 
    this.fetchBloodtest()

    //expansioncard dedtils
    //this.getExpansionCardDetails()

    // get image in base64
    this.healthCrumLogo()

    let date = new Date();
    this.date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }
 

  formFirst : FormGroup;
  formSecond2 : FormGroup;
  newDoseForm : FormGroup;
  patientId : string;
  orderId : string;
  bloodTestControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  bloodTestFilters: Observable<string[]>;
  bloodTestFilters2: Observable<object[]>;

  getquertParameters(){

    this.route.queryParams.subscribe((result)=>{
      console.log("query parameters", result)
      if(result.patientId && result.orderId){
        this.patientId = result.patientId;
        this.orderId = result.orderId
      } else {
        this.router.navigate(['/doctor/appointments'])
      }
    })
  }

  fetchBloodtest(){
    this.service.eprescriptionFetchTest().subscribe(result=>{
      console.log(result);
      if(result.success){
        this.getRequiredValuesOfBloodTest(result.data.packageTest, "packageTest")
        this.getRequiredValuesOfBloodTest(result.data.profileTest, "profileTest")
        this.getRequiredValuesOfBloodTest(result.data.singleTest, "singleTest")
      }
    },
    (error : any)=> alert("Something went wrong"))
  }

  testList : test[] = []
  getRequiredValuesOfBloodTest(testList: any[], testType: string){
    let add: { name: any; testId: any; testType: string; } 
    testList.forEach(test => {
      add = {
        name : test.name,
        testId : test._id,
        testType
      }
      this.testList.push(add)
    });
    console.log("final test list is : ", this.testList)
    this.bloodTestAutoCOmplete()
  }

  getFormGroup(){
    this.formFirst = this.fb.group({
      problems : this.fb.group({
        description : ['', Validators.required],
        remarks : ['', Validators.required]
      }),
      symptoms : this.fb.group({
        description : ['',Validators.required],
        remarks : ['', Validators.required]
      }),
      finding: this.fb.group({
        description : ['', Validators.required],
        remarks : ['', Validators.required]
      }),
      recommendation : this.fb.group({
        description : ['', Validators.required],
        remarks : ['', Validators.required]
      }),
      date : [this.date]
    })
  
    this.formSecond2 = this.fb.group({
      medication : this.fb.array([
        this.addmedicine()
      ]),
      investigation : ['', Validators.required],
      recommendation : ['', Validators.required],
      date : ['']
    })
    this.newDoseForm = this.fb.group({
      investigation : ['', Validators.required],
      recommendTest : this.fb.array([
        
      ]),
      recommendationForPatient : this.fb.array([
        this.addNewDoseForm()
      ])
    })
  }

  getDoctorId(){
    this.doctorId = this.localService.getUserID
    console.log("doctorId is", this.doctorId)
  }

  getHraDetails(){
    this.service.hradetails().subscribe((result) => {
      this.hraReasonBox = result
      console.log(this.hraReasonBox);
    })
  }

  getExpansionCardDetails(){
    this.service.getDataForExpansionCard().subscribe((result)=>{
      this.expansionCard = result;
      console.log(this.expansionCard);
    })
  }

  objectKeys = Object.keys;
  @ViewChild('analysisZone', {static : true}) zonearea : ElementRef

  moveToZone() {
    //this.zonearea.nativeElement.scrollIntoView
    this.zonearea.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  loading : boolean = false;
  public userZone : string
  public showPriscribtion = false;
  public analysis;
  public userZones : string[] = ["Red", "Purple", "Yellow", "Green"]
  // public analysisInvestigation : string[] = ["Reason 1","Reason 2","Reason 3","Reason 4","Reason 5"]
  // public analysisLRA : string[] = ["Reason 1","Reason 2","Reason 3","Reason 4","Reason 5"]
  public analysisPort : string 
  public investigationCheckbox : any;
  
  public lraFromOfUser =  { "Family History" : '15'}
 

  @ViewChild('togglegroup', {static : false}) toggle : ElementRef

  addmedicineButtonClick(): void {

    (<FormArray>this.formSecond2.get('medication')).push(this.addmedicine());

    (<FormArray>this.newDoseForm.get('recommendationForPatient')).push(this.addNewDoseForm());
  }

  addNewDoseForm() : FormGroup{
    return this.fb.group({
      medicineName : ['', Validators.required],
      morningDose: ['', Validators.required],
      noonDose : ['', Validators.required],
      nightOtherDose : ['', Validators.required],
      conditionForDose : ['', Validators.required]
    })
  }

  removeMedicineClick(i : number) : void {
    (<FormArray>this.formSecond2.get('medication')).removeAt(i);

    (<FormArray>this.newDoseForm.get('recommendationForPatient')).removeAt(i)
  }

  addmedicine() : FormGroup{
    return this.fb.group({
      medicine : ['', Validators.required],
      dose : ['', Validators.required],
      timing : ['', Validators.required],
      duration : ['', Validators.required]
    })
  }

  addnew
  submitFirstForm(){
   // console.log(this.formFirst.value);
    this.formFirst.get('date').setValue(this.date);
    // this.service.submitFirstForm(this.formFirst).subscribe(
    //   (result) =>  console.log(result),
    //   (err : any) => console.log(err)
    // )
  }

  submitSecondForm(){
    //console.log(this.formSecond2.value);
    this.formSecond2.get('date').setValue(this.date);
    // this.service.submitSecondForm(this.formSecond2).subscribe(
    //   (result) => {
    //     if(result.message) {
    //       alert("Form Not submitted")
    //     }
    //   },
    //   (err : any) => console.log(err)
    // )
  }
  
  togglefun(event) {
 //   console.log(event);
    this.userZone = event.value;
  }

  // show user dashboard
  showprofile(){
  //  console.log("profile reached")
    const dialogRef  = this.dialog.open(CommonDashboardComponent, {  
      height : '80%',
    })
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog box closed`);
      
    });
  }
  
  investigation(){
    console.log("priscription reached")
    this.showPriscribtion = !this.showPriscribtion
  }

  analysisPart(){
    console.log("analysis");
    this.analysis = true
  }

  className : string 
  onTabChanges(event){  
    this.hraReasonAnswer = []
    //this.analysis = true;
    this.className = `zone-select-${event.tab.textLabel.toLowerCase()}`
    console.log(this.className)
    console.log(event);
    if(event.index == 0) {
      this.analysis = false;
      this.analysisPort = "none";
      
    }  
    else{
      this.userZone = event.tab.textLabel;
      const dialogRef = this.dialog.open(AnalysisComponent, {
        height : '80%',
        width : "500px",
        data : {
          zone : this.userZone,
          question : this.hraReasonBox
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result && result.success) {
          this.hraReasonAnswer = result.allcombine
        }
      })
    }
  }

  lraSection() {
    console.log("lra reached")
  }

  analysisSection(section: string){
    this.analysisPort = section;
    console.log(this.analysisPort)
  }

  check(temp :any){
    console.log(temp.value.property )
  }
  
  showlastconsultant(){
    console.log("last consultant reached")
    const dialogRef  = this.dialog.open(LastConsultantComponent, {  
      height : '80%',
    })
    
    dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog box closed`, result);
      
    })
  }

  finalSubmit(){
    
    if(this.formFirst.invalid){
      Swal.fire("Invalid First form")
      return
    }
    if(this.newDoseForm.invalid){
      Swal.fire("Incomplete medicine form")
      return
    }
    var allData = {
      ...this.formFirst.value,
      ...this.newDoseForm.value,
      selectZone : {
        zone : this.userZone,
        hra : this.hraReasonAnswer
      },
      userId : this.patientId,
      orderId : this.orderId
    }
    console.log("all data is ", allData)
    this.loading = true;
    this.service.submitFirstForm(allData, this.doctorId).subscribe((result)=>{
      console.log("response : ", result)
      if(result.success){
        console.log("data saved")
        this.getDataForPDF(result);
      }
    },
    (err : any)=> console.log(err)
    )
  }

  forPDF : any; 
  getDataForPDF(response){
    
    this.forPDF = {
      ...response.data,
      date  : response.orderDetail.orderDetails[0].dateOfCheckup.slice(0,10),
      appointmentNo : response.orderDetail.appointmentNum,
      patientName : response.userProfile.name,
      gender : response.userProfile.gender,
      age : response.userProfile.age
    }
    console.log(this.forPDF);
    this.afterfinalSubmit();
  }
  logohealthcrum : any;

  healthCrumLogo(){
    console.log("logo reach")
    this.service.healthCrumLogoInBase64().subscribe((res)=>{
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;                
            console.log( "resulr" , base64data);
            this.logohealthcrum = base64data
      }
      reader.readAsDataURL(res); 
    })
  }

  afterfinalSubmit(){

    let medicineData = [];
    for(let i = 0; i < this.forPDF.recommendationForPatient.length; i++){
      medicineData.push([
        i + 1,
        this.forPDF.recommendationForPatient[i].medicineName,
        this.forPDF.recommendationForPatient[i].morningDose,
        this.forPDF.recommendationForPatient[i].noonDose,
        this.forPDF.recommendationForPatient[i].nightOtherDose,
        this.forPDF.recommendationForPatient[i].conditionForDose,
      ])
    }
    console.log(medicineData)
    console.log("table data is ", ...medicineData)

    console.log("pdf maker called")
    
    var dd = {
      watermark: {text :'Healthcrum', opacity : 0.1, color : 'green'},
      content: [
        
      {
      columns: [
      {
      
      image: this.logohealthcrum,
      width: 150
      },
      {
      
          columns : [
              {
                  stack : [
                      {text: [
                          {svg: '<svg width="300" height="200" viewBox="0 0 300 200"></svg>'},
                          'Bhopal, MP'
                      ]},
                    
                      {text : "+91 9755552909" , margin : [0,10,0,0]},
              ]
              },
              {
                  stack : [
                      {text : "support@healthcrum.com" },
                      {text : "www.healthcrum.in" , margin : [0,10,0,0]},
                  ]
              }
          ],
          columnGap : 0
      }
      ],
      columnGap : 80
      },
      {
          columns : [
              {  text : [
                  {text : 'Date :  ', style : "topDetails", alignment : 'left'},  this.forPDF.date
                ]
              },  
              {  text : [
                  {text : 'Appointment Number :  ', style : "topDetails", alignment : 'right'}, this.forPDF.appointmentNo
                ]
              },  
            
                  ],
                    "style" : 'marginT', margin : [0,30,0,10]
      },
      {
          columns : [
              {  text : [
                  {text : 'Patient name :  ', style : "topDetails", alignment : 'left'},  this.forPDF.patientName
                ]
              },  
              {  text : [
                  {text : 'Age  :  ', style : "topDetails"},  this.forPDF.age
                ]
              },
              {  text : [
                  {text : 'Gender :  ', style : "topDetails"},  this.forPDF.gender
                ]
              },              
          ],
          "style" : 'marginT', margin : [0,10,0,10]
      },
      {  text : [
        {text : 'Doctor name :  ', style : "doctorName"},  this.localService.getUserName
        ]
      },
      
          {
      
      table: {
          widths: [ '*', 200, '*'],
      body: [
      [{text : 'Category', style : 'upperTH'},
        {text : 'Description', style : 'upperTH'},
        {text : 'Remarks', style : 'upperTH'},
      ],
      [ {text : 'Problem', bold : true}, this.forPDF.problems.description,this.forPDF.problems.remarks],
      [ {text : 'Symptoms', bold : true}, this.forPDF.symptoms.description,this.forPDF.symptoms.remarks],
      [ {text : 'Finding', bold : true}, this.forPDF.finding.description,this.forPDF.finding.remarks],
      [ {text : 'Recommendation', bold : true}, this.forPDF.recommendation.description,this.forPDF.recommendation.remarks],
      ]
      },
      style : 'marginT'
      },
      {
          text : "Recommended medicine", style : "marginT" , bold :true,
          fontSize : 15 , decoration: 'underline',
      },
      
      {
      
      table: {
          widths: [30, '*', '*', '*', '*', '*'],
      body: [
      [   {text : 'S.No' , bold : true, style : 'upperTH'},
          {text : 'Medicie Name', bold : true, style : 'upperTH'},
          {text :'Morning Dose' , bold : true, style : 'upperTH'},
          {text : 'Noon Dose', bold : true, style : 'upperTH'},
          {text :'Night Dose' , bold : true, style : 'upperTH'},
          {text : 'Others', bold : true, style : 'upperTH'}],
      ...medicineData
      ]
      },
      style : 'marginT'
      },
      {
        columns : [
          {
                text: [
                      { text: 'Investigation :  ', fontSize: 12, bold : true },
                      this.forPDF.investigation
                    ],
                    style : 'marginT'
            },
            {
                      text: [
                      { text:  'Recommended Test : ', fontSize: 12, bold : true },
                        this.forPDF.recommendTest.testName
                      ],
                      style : 'marginT'
                  },
        ],  
      },
      
        
      ],
      
      styles : {
          marginT :{
              margin : [0 , 20, 0 , 0]
          },
          topDetails : {
              bold : true,
              color : '#269693',
              alignment : 'center'
          },
          upperTH : {
              bold : true,
              italics : true,
              fontSize: 13
          },
          lowerTH : {
              bold : true,
              italics : true,
          },
          doctorName : {
            bold : true,
            color : '#269693',
            fontSize : 14,
        }
          
      }
      
      }

    //pdfMake.createPdf(dd).download('prescription_pdf');
    const myPdf = pdfMake.createPdf(dd)
    myPdf.download('prescription_pdf')
    // this.sendPDfToBackEnd(myPdf)
    this.loading = false
    console.log(myPdf)
    myPdf.getBlob((blob)=>{
      console.log("blob is ", blob)
      this.sendPDfToBackEnd(blob)
    })
  }

  sendPDfToBackEnd(myPDF){
    console.log("reached")
    let x : FormData  = new FormData();
    x.append('prescription_pdf', myPDF)
    this.service.eprescriptionSavePDF(this.orderId, x).subscribe((result)=>{
      console.log("after pdf save : ", result)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      }).then((result)=>{
        this.formFirst.reset();
        this.formSecond2.reset();
        this.newDoseForm.reset();
        this.hraReasonAnswer = {};
        this.hraReasonBox = {}
        this.router.navigateByUrl('/doctor/appointments')
      })
    })
  }

  recommendedTestOther : string = "";
  // testSelectes(event ,testId, i){
  //   console.log("event is ", event)
    // console.log( "from list", this.testList[i].name)
    // console.log("form control",this.bloodTestControl.value)
    // console.log("recommended other", this.recommendedTestOther)
    
    // if(event.isUserInput){
    //   console.log("index is ",i)
    //   this.newDoseForm.controls.recommendTest.get('testId').patchValue(this.testList[i].testId)
    //   this.newDoseForm.controls.recommendTest.get('testType').patchValue(this.testList[i].testType)
    //   this.newDoseForm.controls.recommendTest.get('testName').patchValue(this.testList[i].name)
    //   console.log(this.newDoseForm.value)
    // }
  //}

  testSelecteChips(event){
    console.log(event)
  }

  bloodTestAutoCOmplete(){
    this.bloodTestFilters2 = this.bloodTestControl.valueChanges.pipe(
      startWith(''),
      map(value => this.testFilters(value))
    )


    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  otherTest : boolean = false
  otherTestFunction(event){
    if(event.checked)
      this.otherTest = true
    else  
      this.otherTest = false
    this.newDoseForm.get('recommendTest').reset();
    this.bloodTestControl.reset();
  }

  private testFilters(value : string) : object[]{
    const filterValue = value.toLowerCase();

    return this.testList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)
  }



  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput', {static : true}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static : true}) matAutocomplete: MatAutocomplete;

  // add(event: MatChipInputEvent): void {
  //   console.log("add event : ", event)
  //   const input = event.input;
  //   const value = event.value;

   
  //   if ((value || '').trim()) {
  //     this.fruits.push(value.trim());
  //   }

   
  //   if (input) {
  //     input.value = '';
  //   }

  //   this.fruitCtrl.setValue(null);
  // }

  remove(testId: string, index : number): void {
    if(index >= 0) {
      
      (<FormArray>this.newDoseForm.get('recommendTest')).removeAt(index)
      
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event)

    let index = this.testList.map((x)=>{return x.testId}).indexOf(event.option.value)
    
    console.log(index);
    
    let newGroup = this.fb.group({
      testId : [this.testList[index].testId],
      testType : [this.testList[index].testType],
      testName : [this.testList[index].name]
    });

    (<FormArray>this.newDoseForm.get('recommendTest')).push(
      newGroup
    )
    console.log("new form group is :", this.newDoseForm)
  }
}