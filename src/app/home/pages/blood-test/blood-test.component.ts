import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { stringify } from "querystring";
import { UserLocationModal } from "../../../models/userLocation";
import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewDetailsComponent } from "./view-details/view-details.component";

@Component({
  selector: "app-blood-test",
  templateUrl: "./blood-test.component.html",
  styleUrls: ["./blood-test.component.scss"],
})
export class BloodTestComponent implements OnInit {
  myControl = new FormControl();
  isSearched: boolean = false;
  searchText: string = "";
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
  testcol1 : string[] = ["Calcium blood test","Cardiac enzymes","D-dimer test"]
  testcol2 : string[] = ["sugar test.","Vitamins test","Protines enzymes"]
  testcol3 : string[] = ["kidney function tests","basic metabolic panel","glucose tests"]

  options : string[] = ["Calcium blood test","Cardiac enzymes","D-dimer test", 
                        "sugar test.","Vitamins test","Protines enzymes",
                        "kidney function tests","basic metabolic panel","glucose tests"
                      ]
  @ViewChild('menu', {static: true}) menu: ElementRef;
  @ViewChild('toggleButton', {static : true}) toggleButton: ElementRef;

  constructor(
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private matDialog : MatDialog
  ) {
    
  }

  
  ngAfterViewInit() {
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
        //  this.isSearched=false;
      }
    });
  }
  ngOnInit() {
    // this.getLocation();
    this.getIpClientLocation();

    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    this.myControl.valueChanges.subscribe((value) => this.getCities(value));
    // var fruits = ["Banana", "Orange", "Apple", "Mango"];
    // var n = fruits.includes("Mango"); 
    // console.log(n)
    this.filteredSearch = this.mycontrol.valueChanges.pipe(
      startWith('' ),
      map(value =>this.filtersearch(value))
    )
  }
  private filtersearch(value : string) : string[] {
    const filtervalue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filtervalue))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateList.filter(
      (city) => city.toLowerCase().indexOf(filterValue) === 0
    );
  }

  display : string[] = []
  packages  = [
    {package : "Package 1", check : false},
    {package : "Package 2", check : false},
    {package : "Package 3", check : false},
    {package : "Package 4", check : false}
  ]
  maincol2 : string[] = ["Profile 1", "Profile 2","Profile 3"]
  uncheck = true
  filtercontent(value){
    this.display = this.display.filter((x)=> x!= value)
    this.packages[0].check = false
    this.uncheck = false
  }
  searchcart : string[] = [];

  addMaindropdown(x : string) {
    if(this.searchcart.includes(x)) {
      this.searchcart = this.searchcart.filter((i)=> i != x)
    }
    else{
      this.searchcart.push(x);
    }
    this.searchText = "";
    this.searchcart.forEach((x)=>{
      this.searchText += x + "  "
    })
  }

  checkMaindropdown(x) {
    if(this.searchcart.includes(x)){
      return true
    } else{
      return false
    }
  }

  removeFromCart(x) {
    this.searchcart = this.searchcart.filter((i)=> i != x)
  }

  maindropdown(x, event) {
    if(event == true) {
      this.searchcart.push(x)
    }  else{
     this.removeFromCart(x)
    }
    console.log(this.searchcart)
  }

  removeSideFilters(i) {
    this.filtercontent(i)
    console.log(this.display)
  }

  checkCheckBoxvalue(value, event) {
    console.log(value, event)
    if(event == true) {
      this.display.push(value)
    } else {
      this.filtercontent(value)
    }
    console.log(this.display)
  }

  sidepackagescheck(value : string) {
    if(this.display.includes(value)){
      return true
    } else {
      return false
    }
  }

  viewDoctor(index) {
    this.router.navigate(["/view-doctor", 1]);
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

  
  isSearching(event: Event) {
    console.log(this.searchText.length)
    if (this.searchText.length == 1) {
      this.isSearched = true;
    } else {
      this.isSearched = false;
    }
  }

  showModel(){
    if(this.searchText.length < 1) {
      this.isSearched = true
    } else {
      this.isSearched = false
    }
    console.log(this.mycontrol.value)
  }

  mycontrol = new FormControl
  filteredSearch : Observable<string[]>

  showautocomplete(){
    console.log("check autocomplete")
    console.log(this.searchText.length)
    if(this.searchText.length > 0) {
      return true
    } 
    else{
      false
    }
  }
  searchNow(event: Event) {
    console.log(this.searchText);
  }

  setCurrentLocation() {
    this.myControl.setValue(this.city);
  }

  shownresultarray = [
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprice : 4200, healcrumprice : 2500, offerprice : 2000},
  ]

  callfun(){
    console.log("reached")
    this.isSearched = false
  }

  userlogin : boolean = false
  
  booknow(){
    this.router.navigateByUrl('blood-test/12345')
  }

  addTocart(){
    if(this.userlogin == false) {
      this.router.navigateByUrl('signup')
    }
  }

  packageId : string = "123456"
  viewDetails(index){
    console.log(index)
    console.log(this.shownresultarray[index])
    this.matDialog.open(ViewDetailsComponent, {
      data : this.shownresultarray[index]
    })
  }
}
