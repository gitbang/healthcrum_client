import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-feedbacks",
  templateUrl: "./feedbacks.component.html",
  styleUrls: ["./feedbacks.component.scss"],
})
export class FeedbacksComponent implements OnInit {
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
