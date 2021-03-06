import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {HomeServiceService } from '../../home-service.service'
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';

import { UserLocationModal } from "../../../models/userLocation";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BookModelComponent } from './book-model/book-model.component';
import { element } from 'protractor';
import { Options, LabelType } from 'ng5-slider';
import { SrvRecord } from 'dns';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})

export class ConsultationComponent implements OnInit {
  myControl = new FormControl();
  isSearched: boolean = false;
  city: string;
  cities: any = [];
  filteredCities: Observable<string[]>;
  search_city: string;
  stateList: string[] = [];
  cityList: string[] = ["city1", "city2", "city3"];
  locationList: string[] = ["Location1", "Location2", "Location3"];
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  i: number = 0;
  isNext: boolean = false;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private service : HomeServiceService,
    private http: HttpClient,
    private renderer: Renderer2,
    private matDialog : MatDialog,
    private snackbar : MatSnackBar,
    private location :Location
  ) { }
  
  @ViewChild("main", {static : true}) main : ElementRef
  @HostListener('window : resize',['$event'])
  onResize(event) {
    if(window.innerWidth < 1100){
      this.horizontal = false
    } else {
      this.horizontal = true
    }
  }
  rating : number = 3
  ratingArray : Array<number>; 
  category : string;
  activeCity : string = null;

  myDoctorControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    this.getIpClientLocation();

    this.fetchAllCities();
    
    this.ratingArray = Array(5).fill(0)

    this.route.params.subscribe(result=>{
      console.log("params are : ",result)
      if(result.type){
        this.category = result.type;
        this.filters.stream = []
        this.filters.stream.push(result.type)
      }
     
     // this.filters.stream = result.type;
      if(result.city && result.city != undefined){
        console.log("city is : ", result.city)
        this.myControl.setValue(result.city)
        this.activeCity = result.city;
        this.filters.location.city= result.city.toLowerCase();
        console.log("city in filter", this.filters.location.city);
        console.log("filters object : ", this.filters);
        this.filterDotor();
      } else{
        //this.getIpClientLocation();
      } 
    })

    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCity(value))
    );
    
    if(window.innerWidth < 1000){
      this.horizontal = false;
    }

    this.getSpecialistList()
  }
  cityList1 : string[] = []
  fetchAllCities(){
    console.log("fetch all cities")
    this.service.consultationFetchCities().subscribe((result)=>{
      console.log(result)
      if(result.success){
        result.data.forEach(element => {
          this.cityList1.push(element.city)
        });
        console.log("All cities are : ", this.cityList1)
      }
    })
  }
  getCity(event){
    let city = event.option.value
    this.filters.location.city = city.toLowerCase();
    this.filters.location.area = city.toLowerCase();
    this.filterDotor()
  }
  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log("city list : ", this.cityList1)
    return this.cityList1.filter(
      (city) =>(city ? city.toLowerCase().indexOf(filterValue) === 0 : '' ) 
    );  
  }

  specialistList : string[] = []
  getSpecialistList(){
    this.service.consultationGetSpecialistList().subscribe(result=>{
      console.log("specialidy list is : ", result)
      if(result.success){
        this.specialistList = result.data
      }
    })
  }

  autofilldoctor(){
    this.filteredOptions = this.myDoctorControl.valueChanges.pipe(
      startWith(''),
      map(value => this.doctorFilter(value))
    );
  }

  private doctorFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    var x : string[] =  this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return x;
  }
  
  doctorType : string;
  changeRoute(){
    console.log("in changeroute",this.myControl.value)
    //this.location.replaceState("/consultation/"+ this.category + '/'+ this.myControl.value);
   // this.location.replaceState("/consultation/" + this.filters.stream + '/' + this.filters.location.city)
  }

  setCurrentLocation() {
    this.myControl.setValue(this.city);
    //this.filterBylocation();
    this.filters.location.city = this.myControl.value.toLowerCase();
    this.filterDotor();
    this.changeRoute()
  }
  
  doctors = [ 
    { _id : "2",  
     // image : './assets/img/faces/doctor.png',    // profile picture
      
      name : 'DR. PANKAJ MANORIA',  
      experience : 10 ,                            // add + years
      speciality : 'Heart', 
      consultationFees : 500,  
      rating : 5,
      timing : '10am - 6pm',                      
      emergency : 'yes',                    // in consultation
      degree : 'MBBS',                      //  delete in qualification
      city : "Mohali",                       // delete in location
      location : {
        city : "mohali",
        state : "Punjab"
      },
      consultation : {
        emergency : true,
        video : true,
        tele : true,
        physical: true,
      },
      emergencyFees : 2000,
      language : [],
      about : "",
      distance : 5,  
      fromHealthcrum : false,
      gender : 'male',
      pictures : [],
      profilepic : './assets/img/faces/doctor.png',
      qualification : ['MBBS'],
      registerationNumber : '12345',
      stream : 'ayurveda',
      consultationTiming: {
        emergency: {from: "8 am", to: "2 pm"},
        physical : {from: "8 am", to : "6pm"},
        tele: {from: "8 am", to: "2 pm"},
        video: {from: "8 am", to: "2 pm"},
        char :{from: "8 am", to: "2 pm"}
      },
      chat : '8am - 6pm',
      logo : "./assets/img/consulation/logo.png",
      userId : ""
    },
  ]

  horizontal : boolean = true

  knowMore(index){
    console.log(index);
    console.log(this.doctors[index]._id)
    let doc = [];
    doc.push(this.doctors[index])
    this.service.changedoctor(doc)
    this.router.navigateByUrl('/consultation/view-doctor-details/'+ this.doctors[index].userId)
  }


  showNext() {
    this.items = [];
    this.isNext = true;
    this.i++;
    setTimeout(() => {
      for (let i = 1; i <= 12; i++) {
        this.items.push(Math.floor(Math.random() * 100));
      }
    }, 100);

    window.scrollTo(0, 0);
  }

  showPrev() {
    this.items = [];
    setTimeout(() => {
      if (this.i > 1) {
        this.i--;
        for (let i = 1; i <= 12; i++) {
          this.items.push(Math.floor(Math.random() * 100));
        }
      } else {
        this.isNext = false;
        this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      }
    }, 100);

    window.scrollTo(0, 0);
  }

  getCities() {
    console.log("get cities")
    
    if (true) {

      let url =
        "https://indian-cities-api-nocbegfhqg.now.sh/cities";
      this.http.get(url).subscribe((res: any[]) => {
        this.cities = [];
        this.stateList = [];
        res.forEach((el: any) => {
          this.stateList.push(el.City);
        });
        this.cities.push(res);
      });
      console.log(this.stateList);
      console.log(this.cities)
    }
  }

  getIpClientLocation() {
    this.http
      .jsonp(
        "https://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK",
        "callback"
      )
      .subscribe((res: any) => {
        let ip = res.ip;
        this.getLocationName(ip);
      });
  }

  getLocationName(ip: string) {
    let url = "https://ipapi.co/json";
    this.http.get(url).subscribe((res: UserLocationModal) => {
       console.log("response of city",res);
      this.city = res.city;
      this.state = res.regionName;
      this.search_city = this.city;
      //
     // this.myControl.setValue(this.city);
      if(this.activeCity == null) {
        this.setCurrentLocation() 
        this.filters.location.city = this.city;
      }
      
      //this.filterBylocation();
     // this.filterDotor();
    });
  }

  state : string;
  filterBylocation(){
    // console.log(this.city)
    // this.service.consultationFilterByCity(this.myControl.value).subscribe(res=>{
    //   console.log("from server, filterBylocation",res)
    // })
  }

  filters = {
    stream : [],
    speciality : [],
    fromHealthcrum :null,
    consultation : {},
    rating  : [],
    experience : [],
    gender : [],
    name : null,
    location : {
      city : null,
      area : null
    },
    consultationFees : {
      from : 0,
      to : 1000000
    }
  }

  containDoctor : boolean = false
  
  filterDotor(){
    // console.log("filters are : ", this.filters)
    // this.filters.location.city = this.filters.location.city.toLowerCase()
    this.filters.location.city = this.myControl.value.toLowerCase()
    this.filters.location.area = this.myControl.value.toLowerCase()
    console.log(this.filters)
    this.service.consultationFilter(this.filters).subscribe((result)=>{
      console.log("in filterdoctor function ", result);
      this.changeRoute();
      if(result.success){
        
        this.doctors = result.data
        this.autofilldata();
        this.containDoctor = true;
      } else{
        this.containDoctor = false;
      }
    })
  }
  
  autofilldata(){
    let list : string[]= []
    if(this.byname){
      this.doctors.forEach(element=>{
        element.profilepic = this.service.completeUrl(element.profilepic)
        console.log("image complete url is : ", element.profilepic)
        list.push(element.name)
      })
      this.options = list;
    } else {
      this.options = this.specialistList
    }
    console.log(this.options)
    this.autofilldoctor();
  }

  getStream(name : string) {
    //this.filters.stream = name.toLowerCase()
    let index = -1;
    index = this.filters.stream.indexOf(name.toLowerCase())
    if(index >= 0){ 
      this.filters.stream.splice(index, 1)
    } else {
      this.filters.stream.push(name.toLowerCase())
    }
    console.log("filters are : ", this.filters)
    this.filterDotor();
  }

  checkStream(value : string){
    if(this.filters.stream.includes(value.toLowerCase()))
      return true
    else 
      return false
  }
  
  getSpeciality(name : string) {
    let index = -1;
    index = this.filters.speciality.indexOf(name.toLowerCase())
    if(index >= 0){ 
      this.filters.speciality.splice(index, 1)
    } else {
      this.filters.speciality.push(name.toLowerCase())
    }
    //console.log("filters are : ", this.filters)
    this.filterDotor()
  }
  
  getRating(rating : number) {
    let index = -1;
    index = this.filters.rating.indexOf(rating)
    if(index >= 0){ 
      this.filters.rating.splice(index, 1)
    } else {
      this.filters.rating.push(rating)
    }
    //console.log("filters are : ", this.filters)
    this.filterDotor()
  }
  stringToShow : string[] = [];
  getExperience(from : number, to : number, desc : string) {
    let index = -1;
    index = this.filters.experience.map((e)=>{
      return e.from
    }).indexOf(from)
    console.log(index)
    if(index == -1){
      this.filters.experience.push({from , to})
      this.stringToShow.push(desc)
    } else {
      this.filters.experience.splice(index, 1);
      this.stringToShow.splice(index, 1);
    }
    this.filterDotor();
  }
  
  getGender(name : string) {
    let index = -1;
    index = this.filters.gender.indexOf(name.toLowerCase())
    if(index >= 0){ 
      this.filters.gender.splice(index, 1)
    } else {
      this.filters.gender.push(name.toLowerCase())
    }
    this.filterDotor();
  }
  
  filterHealthcrum1 : boolean = false;
  filterHealthcrum2 : boolean = false
  getDoctorType(type : boolean){
  
    console.log(this.filterHealthcrum1, this.filterHealthcrum2)
    if( (this.filterHealthcrum1 == true && this.filterHealthcrum2 == true) ||  (this.filterHealthcrum1 == false && this.filterHealthcrum2 == false)) {
      this.filters.fromHealthcrum = null;
    } else if(this.filterHealthcrum1 == true && this.filterHealthcrum2 == false){
      this.filters.fromHealthcrum = true;
    } else {
      this.filters.fromHealthcrum = false;
    }
    this.filterDotor()
  }

  sorting : boolean = false
  sortDisplay : string = "" 
  sort(ascending : boolean){
    this.sorting = true;
    if(ascending){
      this.sortDisplay = "Low to high"
      this.doctors.sort((a,b)=>{
        return a.consultationFees - b.consultationFees
      })
    } else {
      this.sortDisplay = "High to low"
      this.doctors.sort((a,b)=>{
        return b.consultationFees - a.consultationFees
      })
    }
  }
  consFilterLength : number = 0;
  consultationToshow : string ;
  
  getConsultation(event,type : string){
    console.log(event)
    if(event.checked){
      this.filters.consultation[type] = true;
    } else {
      delete this.filters.consultation[type]
    }
    
    this.consFilterLength = Object.keys(this.filters.consultation).length;
    this.consultationToshow = Object.keys(this.filters.consultation)[0];
    this.filterDotor()
  }
  value: number = 50;
  highValue : number = 160;
  priceOption: Options = {
    floor: 100,
    ceil: 2000,
  }

  priceShow : boolean = false;
  priceDisplay : string = "";
  priceFilter(){
    this.priceShow = true;
    this.priceShow = true;
    console.log(this.value, this.highValue)
    this.priceDisplay = `Rs ${this.value} - Rs ${this.highValue}`
  }
  
  priceFilterEnd(){
    //this.priceDisplay = `Rs ${this.value} - Rs ${this.highValue}`
    this.filters.consultationFees.from = this.value;
    this.filters.consultationFees.to = this.highValue
    console.log("scroll stop")
    this.filterDotor()  
  }

  searchBy : string = 'name';
  searchBarMain : string = "";
  byname : boolean = true;
  
  searchByFunction(event){
    if(event.value == "name"){
      this.byname = true
    } else {
      this.byname = false
    }
    this.autofilldata();
  }

  searchBar(){
    console.log("searchBar : ", this.searchBarMain)
    if(this.searchBarMain.length !=0) {
      if(this.byname) {
        this.filters.name = this.searchBarMain.toLowerCase();
        //this.filters.speciality = null;
      } else{
        
        this.filters.name = null;
      }
    } else {
       this.filters.name = null;
      //  this.filters.speciality = null;
    }
    this.filters.location.city = this.myControl.value
    
    this.filterDotor();
    //this.changeRoute();
  }

  openDialog(typeCons : string, index : number){
    // console.log(typeCons, index);
    let activeFee = 0;
    if(typeCons == "emergency"){
      activeFee = this.doctors[index].emergencyFees
    } else {
      activeFee = this.doctors[index].consultationFees
    }
    console.log("active field ", activeFee);
    
    const dialog = this.matDialog.open(BookModelComponent, {
      height: "90vh",
      data :{
        type : typeCons,
        fee : activeFee,
        doctor : this.doctors[index]
      }
    })

    dialog.afterClosed().subscribe(result=>{
      console.log(result);
      if(result.success) {
        // set data in the service;
        console.log("after dialog closed")
        console.log(result.userdata, result.data)
        let toSaveInService = [{
          userData : result.userdata,
          doctor : {...result.data}
        }]
        this.service.ConsultationchangeDoctorSelected(toSaveInService);
        this.router.navigateByUrl('consultation/checkout')
      }
    })
  }
}
