import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-medecines-purchase",
  templateUrl: "./medecines-purchase.component.html",
  styleUrls: ["./medecines-purchase.component.scss"],
})
export class MedecinesPurchaseComponent implements OnInit {
  cities: any[] = [];
  address: any[] = [];
  areas: any[] = [];
  primary = "primary";
  listOfStateData;
  isAnySelected;
  stateVisible;
  cityVisible;
  addressVisible;
  searchValue;
  searchAddress;
  search(){};
  reset(){};
  searchCity;
  resetCity(){};
  searchCities(){};
  searchAddresses(){};
  resetAddress(){};
  addCategory(){};
  addSubCategory(){};
  addSubSubCategory(){};
  constructor() {}

  ngOnInit() {}
}
