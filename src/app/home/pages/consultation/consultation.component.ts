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
  stateList: string[] = [
    // "Andhra Pradesh",
    // "Arunachal Pradesh",
    // "Assam",
    // "Bihar",
    // "Chandigarh",
    // "Chhattisgarh",
    // "Delhi",
    // "Goa",
    // "Gujarat",
    // "Haryana",
    // "Himachal Pradesh",
    // "Jharkhand",
    // "Karnataka",
    // "Kerala",
    // "Madhya Pradesh",
    // "Maharashtra",
    // "Odisha",
    // "Puducherry",
    // "Punjab",
    // "Rajasthan",
    // "Sikkim",
    // "Tamil Nadu",
    // "Telangana",
    // "Tripura",
    // "Uttarakhand",
    // "Uttar Pradesh",
    // "West Bengal",
  ];
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
    //console.log("event :" , event)
    //console.log(window.innerWidth);
    if(window.innerWidth < 1100){
      this.horizontal = false
    }
  }
  rating : number = 3
  ratingArray : Array<number>; 
  category : string;
  activeCity : string = null;
  ngOnInit() {

    this.getIpClientLocation();
    
    this.ratingArray = Array(5).fill(0)

    this.route.params.subscribe(result=>{
      console.log("params are : ",result)
      this.category = result.type;
      if(result.city && result.city != undefined){
        console.log("city is : ", result.city)
        // send api request to fetch data regarding that city
        this.myControl.setValue(result.city)
        this.activeCity = result.city;
        this.filters.city = result.city
        this.filters.stream = result.type
        console.log("filters object : ", this.filters)
        this.service.consultationFilter(this.filters).subscribe(result=>{
          console.log(result)
        })
      } else{
        this.getIpClientLocation();
      } 
    })

    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    
    if(window.innerWidth < 1000){
      this.horizontal = false;
    }
  }

  doctorType : string;

  changeRoute(){
    this.location.replaceState("/consultation/"+ this.category + '/'+ this.myControl.value);
  }

  setCurrentLocation() {
    this.myControl.setValue(this.city);
    this.filterBylocation();
    this.changeRoute()
  }
  
  doctors = [ 
    {_id : "1",   image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA',  experience : '10+ years', 
    speciality : 'Heart', fee : 5000,  rating : 5, timing : '10am - 6pm', emergency : 'yes', degree : 'MBBS' , city : "Mohali"
    },
    {_id : "2",   image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA',  experience : '10+ years', 
    speciality : 'Heart', fee : 5000,  rating : 5, timing : '10am - 6pm', emergency : 'yes', degree : 'MBBS', city : "Mohali"
    },
    {_id : "3",   image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA',  experience : '10+ years', 
    speciality : 'Heart', fee : 5000,  rating : 5, timing : '10am - 6pm', emergency : 'yes', degree : 'MBBS', city : "Mohali"
    },
    {_id : "4",   image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA',  experience : '10+ years', 
    speciality : 'Heart', fee : 5000,  rating : 5, timing : '10am - 6pm', emergency : 'yes', degree : 'MBBS', city : "Mohali"
    },
    {_id : "5",   image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA',  experience : '10+ years', 
    speciality : 'Heart', fee : 5000,  rating : 5, timing : '10am - 6pm', emergency : 'yes', degree : 'MBBS', city : "Mohali"
    },
    {_id : "6",   image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA',  experience : '10+ years', 
    speciality : 'Heart', fee : 5000,  rating : 5, timing : '10am - 6pm', emergency : 'yes', degree : 'MBBS', city : "Mohali"
    },
  ]

  horizontal : boolean = true

  knowMore(index){
    console.log(index);
    console.log(this.doctors[index]._id)
    this.service.changedoctor(this.doctors[index])
    this.router.navigateByUrl('/consultation/view-doctor-details/'+ this.doctors[index]._id)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateList.filter(
      (city) => city.toLowerCase().indexOf(filterValue) === 0
    );
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

  getCities(value) {
    if (value.length > 2) {
      let url =
        "https://indian-cities-api-nocbegfhqg.now.sh/cities?City_like=" + value;
      this.http.get(url).subscribe((res: any[]) => {
        this.cities = [];
        this.stateList = [];
        res.forEach((el: any) => {
          this.stateList.push(el.City);
        });
        this.cities.push(res);
      });
    }
  }

  getIpClientLocation() {
    this.http
      .jsonp(
        "http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK",
        "callback"
      )
      .subscribe((res: any) => {
        let ip = res.ip;
        this.getLocationName(ip);
      });
  }

  getLocationName(ip: string) {
    let url = "http://ip-api.com/json/" + ip;
    this.http.get(url).subscribe((res: UserLocationModal) => {
       console.log("response of city",res);
      this.city = res.city;
      this.state = res.regionName;
      this.search_city = this.city;
     // this.myControl.setValue(this.city);
      if(this.activeCity == null) {
        this.setCurrentLocation() 
      }
      
      this.filterBylocation();
    });
  }

  state : string;
  filterBylocation(){
    console.log(this.city)
    this.service.consultationFilterByCity(this.myControl.value).subscribe(res=>{
      console.log(res)
    })
  }

  filters = {
    stream : null,
    //location : null,
    speciality : null,
    fromHealthcrum :null,
    consultation : {
      video : null,
      tele : null,
      physical : null,
      emergency : null
    },
    rating  : null,
    experience : null,
    gender : null,
    name : null,
    city : null
  }

  filterDotor(){
    // this.service.consultationFilter(this.filters).subscribe((result)=>{
    //   console.log("in filterdoctor function ", result);
    // })
    console.log(this.filters)
  }

  getStream(name : string) {
    this.filters.stream = name.toLowerCase()
    this.filterDotor();
  }
  getSpeciality(name : string) {
    this.filters.speciality = name
    this.filterDotor();
  }
 
  getRating(rating : number) {
    this.filters.rating = rating
    this.filterDotor();
  }
  getExperience(experience : number) {
    this.filters.experience = experience
    this.filterDotor();
  }
  getGender(gen : string) {
    this.filters.gender = gen
    this.filterDotor();
  }
  getDoctorType(type : boolean){
    this.filters.fromHealthcrum = type;
    this.filterDotor()
  }
  getConsultation(type : string){
    this.filters.consultation.emergency = false
    this.filters.consultation.video = false
    this.filters.consultation.tele = false
    this.filters.consultation.physical = false
    this.filters.consultation[type] = true;
    //console.log("filters in getConsultation function : ", this.filters)
    this.filterDotor()
  }

  searchBy : string = 'name';
  searchBarMain : string = ""
  searchByFunction(event){

    //console.log("in function searchByFunction : ", this.searchBy)
  }
  searchBar(){
    console.log("searchBar : ", this.searchBarMain)
    if(this.searchBy == 'name') {
      this.filters.name = this.searchBarMain;
    } else{
      this.filters.speciality = this.searchBarMain;
    }
    //console.log("searchBar in function", this.filters)
    this.filterDotor();
  }

}
