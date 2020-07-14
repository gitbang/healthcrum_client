import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ditecian",
  templateUrl: "./ditecian.component.html",
  styleUrls: ["./ditecian.component.scss"],
})
export class DitecianComponent implements OnInit {
  cities: any[] = [];
  address: any[] = [];
  areas: any[] = [];
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
  constructor() {}

  ngOnInit() {}
}
