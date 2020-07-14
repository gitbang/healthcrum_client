import { Component, OnInit } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { concatMap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
interface StateData {
  id: string;
  state: string;
}
interface CityData {
  id: string;
  state: string;
  city: String;
}
interface AddressData {
  id: string;
  state: string;
  city: String;
  address: String;
}
interface AreaData {
  id: string;
  state: string;
  city: String;
  address: String;
  area: String;
}
@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
})
export class LocationsComponent implements OnInit {
  // states: StateData[] = [];
  cities: CityData[] = [];
  address: AddressData[] = [];
  areas: AreaData[] = [];
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
