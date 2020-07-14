import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-zumba",
  templateUrl: "./zumba.component.html",
  styleUrls: ["./zumba.component.scss"],
})
export class ZumbaComponent implements OnInit {
  cities: any[] = [];
  address: any[] = [];
  areas: any[] = [];
  primary = "primary";
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
