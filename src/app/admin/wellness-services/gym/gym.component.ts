import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gym",
  templateUrl: "./gym.component.html",
  styleUrls: ["./gym.component.scss"],
})
export class GymComponent implements OnInit {
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
