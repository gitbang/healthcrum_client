import { Component, OnInit } from "@angular/core";
import { Observable, Observer } from "rxjs";

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: "app-webinar",
  templateUrl: "./webinar.component.html",
  styleUrls: ["./webinar.component.scss"],
})
export class WebinarComponent implements OnInit {
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
  asyncTabs: Observable<ExampleTab[]>;
  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: "First", content: "Content 1" },
          { label: "Second", content: "Content 2" },
          { label: "Third", content: "Content 3" },
        ]);
      }, 1000);
    });
  }

  ngOnInit() {}
}
