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

    //expansioncard dedtils
    //this.getExpansionCardDetails()

    let date = new Date();
    this.date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }

  formFirst : FormGroup;
  formSecond2 : FormGroup;
  newDoseForm : FormGroup;

  getquertParameters(){
    this.route.queryParams.subscribe((result)=>{
      console.log("query parameters", result)
    })
  }

  fetchBloodtest(){
   // this.homeService.bloodTestFetchAllTest().subscribe()
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
      recommendation : ['', Validators.required],
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

  onTabChanges(event){  
    this.hraReasonAnswer = []
    //this.analysis = true;
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
      Swal.fire("Invalid result form")
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
      }
    }
    console.log("all data is ", allData)
    this.service.submitFirstForm(allData, this.doctorId).subscribe((result)=>{
      console.log("response : ", result)
      if(result.success){
        console.log("data saved")
      }
    },
    (err : any)=> console.log(err)
    )
  }
}
