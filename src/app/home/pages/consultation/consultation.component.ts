import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import {Router} from '@angular/router'
import {HomeServiceService } from '../../home-service.service'
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';

import { UserLocationModal } from "../../../models/userLocation";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from 'rxjs/operators';

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
    private service : HomeServiceService,
    private http: HttpClient,
    private renderer: Renderer2,
    private matDialog : MatDialog,
    private snackbar : MatSnackBar,
  ) { }
  
  @ViewChild("main", {static : true}) main : ElementRef
  @HostListener('window : resize',['$event'])
  onResize(event) {
    console.log("event :" , event)
    console.log(window.innerWidth);
    if(window.innerWidth < 1100){
      this.horizontal = false
    }
  }
  rating : number = 3
  ratingArray : Array<number> 
  ngOnInit() {

    this.ratingArray = Array(5).fill(0)

    //
    this.getIpClientLocation();
    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    // this.myControl.valueChanges.subscribe((value) => this.getCities(value));
    //  this.filteredSearch = this.myControl.valueChanges.pipe(
    //   startWith('' ),
    //   map(value =>this.filtersearch(value))
    // )
    this.setWidth();
    if(window.innerWidth < 1000){
      this.horizontal = false
    }
  }

  setWidth(){
    if(this.horizontal == true) {
      //this.main.nativeElement.style.minWidth = "1200px"
    }
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



  //----------top search bar --------------//

  // private filtersearch(value : string) : string[] {
  //   const filtervalue = value.toLowerCase();
  //   //return this.options.filter(option => option.toLowerCase().includes(filtervalue))
  // }

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
      // console.log(res);
      this.city = res.city;
      this.search_city = this.city;
      this.myControl.setValue(this.city);
    });
  }

}
