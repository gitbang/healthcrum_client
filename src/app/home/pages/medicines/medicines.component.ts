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
import { UploadPrescriptionComponent } from "./upload-prescription/upload-prescription.component";
import Swal from "sweetalert2";
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
  isLogin : boolean = false;
  // items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // i: number = 0;
  // isNext: boolean = false;
  searchBarMain;
  formatLabel;
  discount;
  isLinear;
  constructor(
    private router: Router,
    private http: HttpClient,
    private snackbar : MatSnackBar,
    private location :Location ,
    private service : HomeServiceService,
    private dialog : MatDialog
  ) {}

  @ViewChild("main", {static : true}) main : ElementRef

  ngOnInit() {
    this.getIpClientLocation();

    this.isLogin = this.service.checkLogin();

    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  setCurrentLocation() {
    this.myControl.setValue(this.city);
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

      if(this.activeCity == null) {
        this.setCurrentLocation() 
      }
    });
  }

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

  //----- top most card ------//

  uploadPrescription(){
    
    const prescription = this.dialog.open(UploadPrescriptionComponent, {
       height : '600px',
      // width : '80%'
    })

    prescription.afterClosed().subscribe((response)=>{
      console.log("close", response);
      if(response.success) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your file has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        console.log("success")
      } else {
        console.log("unsuccess")
      }
    })
    console.log("upload")
  }

  //--------------- search bar -----------------//
  searchText = new FormControl();
  searchBar(){
    console.log(this.searchText.value)
    console.log("search bar")
  }
  proceed(){
    console.log("proceed")
  }

  //----- filters-------//
  //ascending : boolean = true
  priceValue : number = 50;
  price(value : number) {
    console.log("price ", value)
  }
  updatePrice(event){
    console.log("price Value",this.priceValue)
    console.log("price event0", event);
    this.priceValue = event.value
  }
  brand(value : string){
    console.log(value)
  }
  sortMedicine(ascending : boolean) {
    
    this.tablet.sort((a,b)=>{
      if(ascending){
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
  }
  // arrays of category
  menuBar = [ 
    {name : "category1", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category2", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category3", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category4", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category5", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category6", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category7", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category1", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category8", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category1", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
    {name : "category8", 
    subcategory : [
      {
        name : "sub1", 
        subcategory : [
          {name :"subsub1" }
        ]
      },
      {name : "sub2"}
    ]},
  ]

  tablet = [
    {name : "Paracetamol",brand : "My Brand",pieces : 10,stock : "In",price : 100,img : "../../../../assets/img/tablet.png"},
    {name : "Paracetamol",brand : "My Brand",pieces : 10,stock : "out",price : 200,img : "../../../../assets/img/tablet.png"},
    {name : "Paracetamol",brand : "My Brand",pieces : 10,stock : "In",price : 300,img : "../../../../assets/img/tablet.png"},
    {name : "Paracetamol",brand : "My Brand",pieces : 10,stock : "out",price : 400,img : "../../../../assets/img/tablet.png"},
    {name : "Paracetamol",brand : "My Brand",pieces : 10,stock : "In",price : 500,img : "../../../../assets/img/tablet.png"},

  ]

  

  brands : string[] = ["Brand1", "Brand2"];

  prescribeByHealthCrumDoctor(){
    alert("TO be implemented soon");
  }
  onlineConsultation(){
    alert("TO be implemented soon");
  }
  goNext(){
    alert("TO be implemented soon");
  }
}
