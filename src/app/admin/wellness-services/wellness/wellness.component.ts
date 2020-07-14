import { Component, OnInit } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-wellness",
  templateUrl: "./wellness.component.html",
  styleUrls: ["./wellness.component.scss"],
})
export class WellnessComponent implements OnInit {
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
  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.adminService.getStates().subscribe((data) => {
      this.adminService.setStatesData(data.data);
    });

    this.adminService.getCities().subscribe((data) => {
      this.adminService.setCitiesData(data.data);
    });

    this.adminService.getAddress().subscribe((data) => {
      this.adminService.setAddressData(data.data);
    });
    this.adminService.getArea().subscribe((data) => {
      this.adminService.setAreaData(data.data);
    });
  }
}
