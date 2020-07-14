import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-spa",
  templateUrl: "./spa.component.html",
  styleUrls: ["./spa.component.scss"],
})
export class SpaComponent implements OnInit {
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
