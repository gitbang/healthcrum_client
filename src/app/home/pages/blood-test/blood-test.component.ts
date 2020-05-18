import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { stringify } from "querystring";
import { UserLocationModal } from "../../../models/userLocation";
import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";

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
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // this.getLocation();
    this.getIpClientLocation();

    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    this.myControl.valueChanges.subscribe((value) => this.getCities(value));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateList.filter(
      (city) => city.toLowerCase().indexOf(filterValue) === 0
    );
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
    if (this.searchText.length > 3) {
      this.isSearched = true;
    } else {
      this.isSearched = false;
    }
  }
  searchNow(event: Event) {
    console.log(this.searchText);
  }
  setCurrentLocation() {
    this.myControl.setValue(this.city);
  }
}
