import { Component, OnInit, Renderer2, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeServiceService } from "app/home/home-service.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Location } from '@angular/common';
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { UserLocationModal } from "app/models/userLocation";

@Component({
  selector: "app-medicines",
  templateUrl: "./medicines.component.html",
  styleUrls: ["./medicines.component.scss"],
})
export class MedicinesComponent implements OnInit {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  i: number = 0;
  isNext: boolean = true;
  tablets: boolean = false;
  capsules: boolean = false;
  syrups: boolean = false;
  others: boolean = false;


  myControl = new FormControl();
  isSearched: boolean = false;
  
  city: string;
  cities: any = [];
  filteredCities: Observable<string[]>;
  search_city: string;
  stateList: string[] = [];
  cityList: string[] = ["city1", "city2", "city3"];
  locationList: string[] = ["Location1", "Location2", "Location3"];
  activeCity : string = null;
  state : string;
  // items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // i: number = 0;
  // isNext: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackbar : MatSnackBar,
    private location :Location  
  ) {}

  @ViewChild("main", {static : true}) main : ElementRef

  ngOnInit() {
    this.getIpClientLocation();

    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  setCurrentLocation() {
    this.myControl.setValue(this.city);
    //this.filterBylocation();
    //this.filters.location.city = this.myControl.value.toLowerCase();
    // this.filterDotor();
    // this.changeRoute()
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateList.filter(
      (city) => city.toLowerCase().indexOf(filterValue) === 0
    );
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
      //
     // this.myControl.setValue(this.city);
      if(this.activeCity == null) {
        this.setCurrentLocation() 
        //this.filters.location.city = this.city;
      }
      
      //this.filterBylocation();
     // this.filterDotor();
    });
  }



  goNext() {}
  goToMedecine(type) {
    this.router.navigate(["/medecine", type]);
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

  tablet = [{
    name : "Paracetamol",
    brand : "My Brand",
    pieces : 10,
    stock : "In",
    price : 100,
    img : "../../../../assets/img/tablet.png"
  }]

  brands : string[] = ["Brand1", "Brand2"]
}
