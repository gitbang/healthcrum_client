import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-equipment-purchase",
  templateUrl: "./equipment-purchase.component.html",
  styleUrls: ["./equipment-purchase.component.scss"],
})
export class EquipmentPurchaseComponent implements OnInit {
  cities: any[] = [];
  address: any[] = [];
  areas: any[] = [];
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
  primary = "primary";
  constructor() {}

  ngOnInit() {}
}
