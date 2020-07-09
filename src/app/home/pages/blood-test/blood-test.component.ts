import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { stringify } from "querystring";
import { UserLocationModal } from "../../../models/userLocation";
import { FormControl, FormBuilder } from "@angular/forms";
import { startWith, map, single } from "rxjs/operators";
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewDetailsComponent } from "./view-details/view-details.component";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {HomeServiceService} from '../../home-service.service'
import { TestBed } from "@angular/core/testing";

export interface Fruit {
  name : string
}

@Component({
  selector: "app-blood-test",
  templateUrl: "./blood-test.component.html",
  styleUrls: ["./blood-test.component.scss"],
})
export class BloodTestComponent implements OnInit {
  myControl = new FormControl();
  isSearched: boolean = false;
  //userId : string = "1234";
  userId : string = "5e8efa895b324a3e4c97a278";
  city: string;
  cities: any = [];
  filteredCities: Observable<string[]>;
  search_city: string;
  stateList: string[] = [];
  isLogin : boolean;
  cityList: string[] = ["city1", "city2", "city3"];
  locationList: string[] = ["Location1", "Location2", "Location3"];
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  i: number = 0;
  isNext: boolean = false;


  
  // @ViewChild('menu', {static: true}) menu: ElementRef;
  // @ViewChild('toggleButton', {static : true}) toggleButton: ElementRef;

  constructor(
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private matDialog : MatDialog,
    private snackbar : MatSnackBar,
    private service : HomeServiceService,
    private fb : FormBuilder
  ) {


    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filterfruit(fruit) : this.allFruits.slice()));
  
    // this.service.currentCart.subscribe((result)=>{
    //   //console.log("my cart in blood test", result)
    //   if(result.length > 0) {
    //     this.mycart = result
    //   }
    // })
  }

  ngOnInit() {
    // this.getLocation();
    this.isLogin= this.service.checkLogin();
    
    if(this.isLogin)
      this.cartfromServer();
    else
      this.cartfromClient(); 

    this.ratingArray = Array(5).fill(0);
    this.getIpClientLocation();
    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  
    this.fetchbloodtest();

    // this.ratingArray = Array(5).fill(0)
    
    if(window.innerWidth < 1200){
      this.horizontal = false;
    }
  }
  //--------fetch cart info---------//
  cartfromClient(){
    console.log("from client")
    this.service.currentCompleteCart.subscribe((result)=>{
      console.log("my cart in blood test",result);
      this.myCartComplete = result;
      this.mycart = []
      result.forEach(test=>{
        this.mycart.push(test._id)
      })

      this.addToSearchCart();
    })
  }

  addToSearchCart(){
    //console.log("add to search cart complete",this.myCartComplete)
    this.searchcart = []
    this.myCartComplete.forEach(test=>{
      this.searchcart.push(test.name)
    })
    //console.log("search cart0 ", this.searchcart)
  }

  cartfromServer(){
    //console.log("from server")
    this.service.bloodTestGetCartServer(this.userId).subscribe((result)=>{
      //console.log("from server", result)
      if(result.success){

        this.myCartComplete = [];
        this.mycart = []
       // console.log("cart from backend", result)
        result.data.forEach(test =>{
          //console.log("lab id",test.labId)
          let add;
          let offerprice = test.offerPrice;
          let marketprice = test.mrp
          let offers  = test.offerPrice / test.mrp * 100;
          
          offers = 100 - Math.round(offers)
          let parameters = 1
          if(test.individualTests) {
             parameters = test.individualTests.length;
          } 
         
          add = {...test, offer : offers, parameters :parameters,
             offerprice : offerprice, marketprice  : marketprice, labId : test.labId }
          this.myCartComplete.push(add)
          this.mycart.push(test._id)
        })
        this.addToSearchCart();
        // console.log("my cart complete", this.myCartComplete)
        // console.log("")
        this.pushtoService()

      } else {
        console.log("success false", result)
      }
    })
   
  } 


  /* -----------------cart open----------------------*/
  proceed(){
    this.router.navigateByUrl('blood-test/mycart/12345')
  }
  /*------------------TOP search open------------------ */

  afterFetch(){
    this.profileTestFiltered = this.mycontrol.valueChanges.pipe(
      startWith(''),
      map(value => this.filterprofiletest(value))
    )

    this.singleTestFiltered = this.mycontrol.valueChanges.pipe(
      startWith(''),
      map(value => this.filtersingletest(value))
    )
    this.packageTestFiltered = this.mycontrol.valueChanges.pipe(
      startWith(''),
      map(value => this.filterpackagetest(value))
    )
  }

  filterprofiletest(value){
    const filterValue = value.toLowerCase();
    return this.profileTest.filter( test => test.toLowerCase().includes(filterValue));
  }

  filtersingletest(value){
    const filterValue = value.toLowerCase();
    return this.singleTest.filter( test => test.toLowerCase().includes(filterValue));
  }

  filterpackagetest(value){
    const filterValue = value.toLowerCase();
    return this.packageTest.filter( test => test.toLowerCase().includes(filterValue));
  }
 
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon', "Apple"];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

 // @ViewChild('fruitInput', {static : true}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static : true}) matAutocomplete: MatAutocomplete;

  testcol1 : string[] = ["Calcium blood test","Cardiac enzymes","D-dimer test"]
  testcol2 : string[] = ["sugar test.","Vitamins test","Protines enzymes"]
  testcol3 : string[] = ["kidney function tests","basic metabolic panel","glucose tests"]

  singleTest : string[] = ["Calcium blood test","Cardiac enzymes","D-dimer test"]
  packageTest : string[]= ["sugar test.","Vitamins test","Protines enzymes"]
  profileTest : string[]= ["kidney function tests","basic metabolic panel","glucose tests"]
  mycontrol = new FormControl
  filteredSearch : Observable<string[]>

  singleTestFiltered : Observable<string[]>
  profileTestFiltered : Observable<string[]>
  packageTestFiltered : Observable<string[]>

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.searchcart.indexOf(fruit);
    if (index >= 0) {
      this.searchcart.splice(index, 1);
      let ind = this.comparison(fruit);
      this.removeFromcart(ind);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitCtrl.setValue(null);
  }

  private _filterfruit(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  searchText: string = "";
  options : string[] = ["Calcium blood test","Cardiac enzymes","D-dimer test", 
                        "sugar test.","Vitamins test","Protines enzymes",
                        "kidney function tests","basic metabolic panel","glucose tests"
                      ]

  private filtersearch(value : string) : string[] {
    const filtervalue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filtervalue))
  }

  showModel(){
    if(this.searchText.length < 1) {
      this.isSearched = true
    } else {
      this.isSearched = false
    }
   
  }

  /*--------------------------top search close-----------------------------*/
  
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

  comparison(x : string){
    let index : number
    this.shownresultarray.forEach((value, i)=>{
      console.log(x , value.name)
      if(value.name.toLowerCase() == x.toLowerCase()){
        index = i;
        console.log(index)
      }
    })
    return index
  }

  addMaindropdown(x : string) {
    //console.log("main drop down")
    let index = this.comparison(x);
    
    console.log("index is : ", index)
    if(this.searchcart.includes(x)) {
      this.searchcart = this.searchcart.filter((i)=> i != x)
      this.removeFromcart(index);
    }
    else{
      // add to cart
      //this.searchcart.push(x);
      this.addTocart(index)
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

  // removeFromCart(x) {
  //   this.searchcart = this.searchcart.filter((i)=> i != x)
  // }

  // maindropdown(x, event) {
  //   if(event == true) {
  //     this.searchcart.push(x)
  //   }  else{
  //    this.removeFromCart(x)
  //   }
  //  // console.log(this.searchcart)
  // }

  removeSideFilters(i) {
    this.filtercontent(i)
   // console.log(this.display)
  }

  checkCheckBoxvalue(value, event) {
   // console.log(value, event)
    if(event == true) {
      this.display.push(value)
    } else {
      this.filtercontent(value)
    }
   // console.log(this.display)
  }

  sidepackagescheck(value : string) {
    if(this.display.includes(value)){
      return true
    } else {
      return false
    }
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
   
    if (this.searchText.length == 1) {
      this.isSearched = true;
    } else {
      this.isSearched = false;
    }
  }

  setCurrentLocation() {
    this.myControl.setValue(this.city);
  }
  horizontal : boolean = true;
  @HostListener('window : resize',['$event'])
  onResize(event) {
    //console.log("event :" , event)
    //console.log(window.innerWidth);
    if(window.innerWidth < 1270){
      this.horizontal = false
    } else {
      this.horizontal = true
    }
  }

  ratingArray : Array<number>;
  rating = 3;
  myId : string = "5e8efa895b324a3e4c97a278"
  datafound : boolean = false
  fromdatabase ;

  fetchbloodtest(){
    this.service.bloodTestFetchAllTest().subscribe((result)=>{
      console.log("initial fetch", result)
      if(result.success) {
        this.datafound = true
        this.fromdatabase = result
      //  let single = result.SingleTests;
        this.insertFetchedData(result)
      } else {
        this.datafound = false;
        console.log("no data found")
      }
    })
  }
  insertFetchedData(result) {
    this.shownresultarray = [],
      this.resultFromApi = result
      if(result.PackageTests.length > 0){
        let add ;
        let list : Array<string> = []
        result.PackageTests.forEach((pack)=>{
          list.push(pack.name)
          let offers  = pack.offerPrice / pack.mrp * 100;
          offers = 100 - Math.round(offers)
          add = {
            _id         : pack._id,
            name        : pack.name,
            labLogo     : pack.lab.logo,
            parameters  : pack.individualTests.length,
            marketprice : pack.mrp,
            offerprice  : pack.offerPrice,
            rating      : pack.lab.rating,
            type        : 'packageTest',
            fasting     : pack.fasting,
            reportTAT   : pack.reportingTime.within,
            recommendedFor : {
              ...pack.recommended_for
            },
            recommendedage : {
              ...pack.recommended_age
            },
            what : pack.what,
            why : pack.why,
            when : pack.when,
            offer : offers,
            labId : pack.lab._id,
            additional_Info : pack.additional_Info,
            relatedDiseases : pack.relatedDiseases
          }
        })
        this.shownresultarray.push(add)
        this.packageTest = list
      }
      if(result.SingleTests.length > 0) {   
        let add ;
        let list : Array<string> = []
        result.SingleTests.forEach((pack)=>{
          // this.getRating(pack.lab.rating);
          list.push(pack.name)
          let offers  = pack.offerPrice / pack.mrp * 100;
          offers = 100 - Math.round(offers)
          add = {
            _id         : pack._id,
            name        : pack.name,
            labLogo     : pack.lab.logo,
            parameters  : 1,
            marketprice : pack.mrp,
            offerprice  : pack.offerPrice,
            rating      : pack.lab.rating,
            type        : 'singleTest',
            fasting     : pack.fasting,
            reportTAT : pack.reportingTime.within,
            recommendedFor : {
              ...pack.recommended_for
            },
            recommendedage : {
              ...pack.recommended_age
            },
            what : pack.what,
            why : pack.why,
            when : pack.when,
            offer : offers,
            labId : pack.lab._id,
            additional_Info : pack.additional_Info,
            relatedDiseases : pack.relatedDiseases
          }
        })
        this.shownresultarray.push(add)
        this.singleTest = list
      } 
      if(result.ProfileTests.length > 0) {
        let add ;
        let list : Array<string> = []
        result.ProfileTests.forEach((pack)=>{
          list.push(pack.name)
          let offers  = pack.offerPrice / pack.mrp * 100;
          offers = 100 - Math.round(offers)
          add = {
            _id : pack._id,
            name : pack.name,
            labLogo : pack.lab.logo,
            parameters : pack.individualTests.length,
            marketprice : pack.mrp,
            offerprice : pack.offerPrice,
            rating : pack.lab.rating,
            type : 'profileTest',
            fasting : pack.fasting,
            reportTAT : pack.reportingTime.within,
            recommendedFor : {
              ...pack.recommended_for
            },
            recommendedage : {
              ...pack.recommended_age
            },
            what : pack.what,
            why : pack.why,
            when : pack.when,
            offer : offers,
            labId : pack.lab._id,
            additional_Info : pack.additional_Info,
            relatedDiseases : pack.relatedDiseases
          }
        })
        this.shownresultarray.push(add)
        this.profileTest = list
      }
    this.afterFetch();
  }

  resultFromApi : any
  shownresultarray = [
    { _id : "abc123", 
      name : "Blood Test", 
      includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", 
      rating : 3,
      reportTAT : "24 hrs", 
      parameters : 12,
      marketprice : 1200, 
      type:'singleTest',
      healcrumprice : 1000, 
      offerprice : 800,
      labLogo : "./assets/img/consulation/logo.png",
      fasting : "yes",
      labId : "1234"
    },
  ]

  callfun(){
    this.isSearched = false
  }

  userlogin : boolean = false
  singleTestComplete = [];

  booknow(index : number){
    this.singleTestComplete = []
    this.singleTestComplete.push(this.shownresultarray[index]);
    this.service.bookSingleTest(this.singleTestComplete);
    this.router.navigateByUrl('blood-test/' + this.shownresultarray[index]._id)
  }

  mycart: string[]= []      // collect _id of the packages 
  myCartComplete = [];

  addTocart(index : number){
    console.log("add to cart", this.shownresultarray[index]);
    for(let  i = 0; i < this.myCartComplete.length; i++) {
      if( this.shownresultarray[index]._id == this.myCartComplete[i]._id) {
        alert("Already added")
        return
      }
    }
    if(this.isLogin){
      console.log("add to cart from server")
      let toSend = {
        testId : this.shownresultarray[index]._id,
        labId  : this.shownresultarray[index].labId,
        type   : this.shownresultarray[index].type,
      }
      this.service.bloodTestPostCartServer(this.userId, toSend).subscribe((result)=>{
        if(result.success) {
          console.log("success", result)
          this.snackbar.open("Package", "Added", {
            duration : 1000
          })
          this.cartfromServer();
        } else {
          console.log("unable to store", result)
        }
      })

    } else{
      this.mycart.push(this.shownresultarray[index]._id)
      this.myCartComplete.push(this.shownresultarray[index]);
      this.snackbar.open("Package", "Added",  {
        duration : 1000
      })
      this.pushtoService();
    }
  }
  pushtoService(){
    this.service.changeMessage(this.mycart);
    this.service.addCompleteDetailsToCart(this.myCartComplete);
  }
  removeFromcart(index : number) {

    if(this.isLogin) {
      console.log(this.myCartComplete)
      this.service.bloodTestDeleteCartServer(this.userId, this.shownresultarray[index]._id)
        .subscribe((result)=>{
          if(result.success) {
            console.log(result)
            this.snackbar.open("Package", "Removed", {
              duration : 1000
            })
            this.cartfromServer();
          } else {
            console.log("unable to delete from cart", result)
          }
        })

    } else {

      let _id = this.shownresultarray[index]._id
      this.mycart = this.mycart.filter((x)=> _id != x)
      this.myCartComplete = this.myCartComplete.filter((x)=> x._id != _id)
      this.snackbar.open("Package", "Removed", {
        duration : 1000
      })
      this.pushtoService();

    } 
  }

  checkcart(_id : string) {
    if(this.mycart.includes(_id))
      return true
    else
      return false
  }
  
  packageId : string = "123456"
  viewDetails(index){
    this.singleTestComplete = []
    this.singleTestComplete.push(this.shownresultarray[index]);
    this.service.bookSingleTest(this.singleTestComplete);
    this.router.navigateByUrl("blood-test/viewdetails/"+ this.shownresultarray[index]._id)
  }


  //-------------code for top filters-------------------//

  sortPackage(ascending : boolean) {
    if(ascending) {
      this.shownresultarray.sort((a,b)=> {
        return a.offerprice - b.offerprice
      })
    } else {
      this.shownresultarray.sort((a,b)=> {
        return b.offerprice - a.offerprice
      }) 
    }
    console.log("in sort", this.shownresultarray)
  }

  filterToSend = {
    men : false,
    women : false,
    senior : false,
    kids : false
  }
  filterChanges(event, toapply){
    console.log(event.checked)
    this.filterToSend[toapply] = event.checked;
    console.log(this.filterToSend)
    this.applyFilters();
  }
  applyFilters(){
    this.service.bloodTestApplyFilters(this.filterToSend).subscribe((response)=>{
      console.log("filter search" ,response)
      if(response.success){
        this.datafound = true;
        this.insertFetchedData(response)
      } else {
        this.datafound = false
        console.log("no data found")
      }
    })
  }


  //-------------code for top search bar-------------------//

  topSearch = this.fb.array([
    this.fb.group({
      _id : [],
      singleTest : ['false'],
      packageTest : ['false'],
      profileTest : ['fasle']
    })
  ])
}
