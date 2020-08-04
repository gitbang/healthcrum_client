import { Component, OnInit } from "@angular/core";
import { MouseEvent } from "@agm/core";
import {
  faUserMd,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { HttpClient } from "@angular/common/http";
import { AdminService } from "app/services/admin.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.scss"],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class DoctorsComponent implements OnInit {
  doc_icon = faUserMd;
  doc_add = faUserPlus;
  doc_edit = faUserEdit;
  phide: boolean = true;
  hide: boolean = true;
  genderList: string[] = ["Male", "Female", "other"];
  name: string;
  age: string;
  gender: string;
  daysName: any[] = [
    { name: "Sunday", value: "sunday" },
    { name: "Monday", value: "monday" },
    { name: "Tuesday", value: "tuesday" },
    { name: "Wednesday", value: "wednesday" },
    { name: "Thrusday", value: "thrusday" },
    { name: "Friday", value: "friday" },
    { name: "Saturday", value: "saturday" },
  ];
  firstFormGroup = this.fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],  
    registrationNumber: ['', Validators.required],
    dob: ['', Validators.required],
    about:['', Validators.required],
  });

  secondFormGroup = this.fb.group({
    state: ['', Validators.required],
    city: ['', Validators.required],
    add: ['', Validators.required],
  });

  thirdFormGroup = this.fb.group({
    experience: ['', Validators.required],
    qualification: ['', Validators.required],
    speciality: ['', Validators.required],
    languages: ['', Validators.required],
    stream: ['', Validators.required],
    fromHealthcrum: ['', Validators.required],
  });

  fourthFormGroup = this.fb.group({
    emergency: [''],
    video: [''],
    tele: [''],
    physical: [''],
    chat: [''],
    emergency_from: [''],
    emergency_to: [''],
    video_from: [''],
    video_to: [''],
    tele_from: [''],
    tele_to: [''],
    physical_from: [''],
    physical_to: [''],
    chat_from: [''],
    chat_to: [''],
    emergencyFees: ['', Validators.required],
    consultationFees: ['', Validators.required],
    days:['', Validators.required]
  });

  fifthFormGroup = this.fb.group({
    email: ['', Validators.required],
    contact: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required]
  });

  logo_file:File = null;
  loadingVerified:boolean = true;
  loadingUnverified:boolean = true;
  unverifiedDoctorData:any[] = [];
  verifiedDoctorData:any[] = [];

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.userId._id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.userId._id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  setOfCheckedId = new Set<any>();

  updateCheckedSet(id: any, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: any, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.userId._id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.userId._id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.userId._id)) && !this.checked;
  }
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private adminService:AdminService
  ) {}

  ngOnInit() {
    this.getUnverifiedDoctors();
  }

  logoUpload(e){
    this.logo_file = e.target.files[0];
  }

  zoom: number = 8;
  lat: number = 22.427095946682467;
  lng: number = 79.92415996874999;

  clickedMarker(label: string, index: number) {}

  mapClicked($event: MouseEvent) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
    this.getAddressDetails($event.coords.lat, $event.coords.lng);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    this.getAddressDetails($event.coords.lat, $event.coords.lng);
  }

  marker: marker = {
    lat: this.lat,
    lng: this.lng,
    label: "M",
    draggable: true,
  };

  public getAddressDetails(lat, long) {
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=ef023180e56342a193ff4b658e2f02dd`;
    this.httpClient.get(url).subscribe((res: any) => {
      console.log(res);
      if (res.results.length > 0) {
        let data = res.results[0].components;
        // let add_full = res.result[0].formatted;
        this.secondFormGroup.get("state").setValue(data.state);
        this.secondFormGroup.get("city").setValue(data.state_district);
        this.secondFormGroup.get("add").setValue(res.results[0].formatted);
      }
    });
  }

  getUnverifiedDoctors(){
    this.loadingUnverified = true;
    this.adminService.getAllUnverifiedDoctors().subscribe((res:any)=>{
      this.loadingUnverified = false;
      if(res.success){
        this.unverifiedDoctorData = res.data;
      }
    })
  }
  getVerifiedDoctors(){
    this.loadingVerified = true;
    this.adminService.getAllVerifiedDoctors().subscribe((res:any)=>{
      this.loadingVerified = false;
      if(res.success){
        this.verifiedDoctorData = res.data;
      }
    })
  }

  addDoctor(){

    if(this.fifthFormGroup.get('password').value !== this.fifthFormGroup.get('cpassword').value){
      Swal.fire("Warning","Password doesn't matched .",'warning');
      return;
    }
    let datas = new FormData();
    datas.append('profile_image',this.logo_file);
    datas.append("name",this.firstFormGroup.get('name').value);
    datas.append("email",this.fifthFormGroup.get('email').value);
    datas.append("phone",this.fifthFormGroup.get('contact').value);
    datas.append("password",this.fifthFormGroup.get('password').value);
    datas.append("dob",this.firstFormGroup.get('dob').value);
    datas.append("gender",this.firstFormGroup.get('gender').value);
    datas.append("registrationNumber",this.firstFormGroup.get('registrationNumber').value);
    datas.append("stream",this.thirdFormGroup.get('stream').value);
    let location = {
      state:this.secondFormGroup.get('state').value, 
      city:this.secondFormGroup.get('city').value, 
      area:this.secondFormGroup.get('add').value, 
      lat:0.0, log:0.00};

    datas.append('location',JSON.stringify(location));
    datas.append("speciality",this.thirdFormGroup.get('speciality').value);
    datas.append("experience",this.thirdFormGroup.get('experience').value);
    datas.append("qualification",this.thirdFormGroup.get('qualification').value);
    datas.append("consultationFees",this.fourthFormGroup.get('consultationFees').value);
    datas.append("address",this.secondFormGroup.get('add').value + "," + this.secondFormGroup.get('city').value +","+ this.secondFormGroup.get('state').value);
    datas.append("languages",this.thirdFormGroup.get('languages').value);
    let  consultation = 
    { emergency: this.fourthFormGroup.get('emergency').value, video: this.fourthFormGroup.get('video').value,
            tele:this.fourthFormGroup.get('tele').value, physical:this.fourthFormGroup.get('physical').value,
            chat:this.fourthFormGroup.get('chat').value
        };
        
    datas.append("consultation",JSON.stringify(consultation));
    datas.append("emergencyFees",this.fourthFormGroup.get('emergencyFees').value);
    datas.append("fromHealthcrum",this.thirdFormGroup.get('fromHealthcrum').value);
    datas.append( "days",this.fourthFormGroup.get('days').value);
    datas.append("about",this.firstFormGroup.get('about').value);
   

  let temp = {};
    if(this.fourthFormGroup.get('emergency').value){
        temp['emergency'] = { from : new Date(`1 2 2020 ${this.fourthFormGroup.get('emergency_to').value}`).toTimeString().split(' ')[0],
                              to: new Date(`1 2 2020 ${this.fourthFormGroup.get('emergency_from').value}`).toTimeString().split(' ')[0]};
    }
    if( this.fourthFormGroup.get('video').value){
      temp['video'] = { from : new Date(`1 2 2020 ${this.fourthFormGroup.get('video_to').value}`).toTimeString().split(' ')[0],
      to: new Date(`1 2 2020 ${this.fourthFormGroup.get('video_from').value}`).toTimeString().split(' ')[0]};
    }
    if(this.fourthFormGroup.get('tele').value ){
      temp['tele'] = { from : new Date(`1 2 2020 ${this.fourthFormGroup.get('tele_to').value}`).toTimeString().split(' ')[0],
      to: new Date(`1 2 2020 ${this.fourthFormGroup.get('tele_from').value}`).toTimeString().split(' ')[0]};
    }
    if(this.fourthFormGroup.get('physical').value){
      temp['physical'] = { from : new Date(`1 2 2020 ${this.fourthFormGroup.get('physical_to').value}`).toTimeString().split(' ')[0],
      to: new Date(`1 2 2020 ${this.fourthFormGroup.get('physical_from').value}`).toTimeString().split(' ')[0]};
    }
    if(this.fourthFormGroup.get('chat').value){
      temp['chat'] = { from : new Date(`1 2 2020 ${this.fourthFormGroup.get('chat_to').value}`).toTimeString().split(' ')[0],
      to: new Date(`1 2 2020 ${this.fourthFormGroup.get('chat_from').value}`).toTimeString().split(' ')[0]};
    }

    datas.append('consultationTiming', JSON.stringify(temp));
    // datas.append();

    this.adminService.registerDoctor(datas).subscribe((res:any)=>{
      if(res.success){
            Swal.fire('Success!','Doctor has been registred successfully','success');
      }else{
        Swal.fire("Error!",res.message,'error');
      }
    })
  }
  ApproveDoctors(){
    let data = {
      doctorIds : this.setOfCheckedId,
    }

    console.log(data);
    this.adminService.approveDoctor(data).subscribe((res)=>{
      if(res.success){
        this.setOfCheckedId.clear();
        this.checked = false;
        this.indeterminate = false;
          Swal.fire("Success!","Doctors Approved Successfully","success");
          this.getUnverifiedDoctors();
      }else{
        Swal.fire("Error!",res.message,"error");
      }
    })
  }
  
}



// interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
