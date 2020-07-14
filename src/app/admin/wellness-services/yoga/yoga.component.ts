import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-yoga",
  templateUrl: "./yoga.component.html",
  styleUrls: ["./yoga.component.scss"],
})
export class YogaComponent implements OnInit {
  cities: any[] = [];
  address: any[] = [];
  areas: any[] = [];
  constructor() {}

  ngOnInit() {}
  listOfStateData;
  stateVisible;
  cityVisible;
  addressVisible;
  searchValue;
  searchCity;
  searchAddress;
  searchCities;
  search(){};
  resetCity(){};
  reset(){};
  deleteRow(id){};
  stopEdit(){};
  searchAddresses;
  resetAddress(){};
}
