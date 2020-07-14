import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { NzMessageService } from "ng-zorro-antd/message";

interface ItemData {
  id: string;
  name: string;
}
@Component({
  selector: "app-area",
  templateUrl: "./area.component.html",
  styleUrls: ["./area.component.scss"],
})
export class AreaComponent implements OnInit {
  public stateSelected: any;
  public citySelected: any;
  public states: any[];
  public cities: any[];
  public addresses: any[];
  public areas: any[];
  public area: String;
  public address: String;
  addressSelected;
  searchAddress;
  i = 0;
  editId: string | null = null;
  searchValue = "";
  searchCity: String = "";
  searchAddres: String = "";
  stateVisible = false;
  cityVisible = false;
  addressVisible = false;
  listOfStateData: any[];

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {
    adminService.stateData$.subscribe((states) => {
      this.states = states;
    });

    adminService.areasData$.subscribe((areas) => {
      console.log("area => ", areas);
      this.areas = areas;
      this.listOfStateData = this.areas;
    });
  }

  ngOnInit() {}
  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    if (this.stateSelected.length == 0) {
      this.message.error("Please select state name", { nzDuration: 2500 });
      return;
    }
    if (this.citySelected.length == 0) {
      this.message.error("Please select city name", { nzDuration: 2500 });
      return;
    }
    if (this.address.length == 0) {
      this.message.error("Please provide address", { nzDuration: 2500 });
      return;
    }
    this.message.loading("Saving city ...");
    const data = {
      state: this.stateSelected,
      city: this.citySelected,
      address: this.address,
      area: this.area,
    };
    this.adminService.saveCity(data).subscribe((data) => {
      this.message.remove("");
      this.message.success("Address save successfully");
      if (data.success) {
        this.addresses = [...this.addresses, data.data];
        this.listOfStateData = this.addresses;
      } else this.message.error(data.message, { nzDuration: 2500 });
    });

    this.i++;
  }

  public getCities($event) {
    let data = { state: this.stateSelected };
    this.adminService.getCity(data).subscribe((res) => {
      if (res.success) {
        this.cities = res.data;
      } else {
        this.message.error(
          "Failed to get cities of the " + this.stateSelected,
          { nzDuration: 2500 }
        );
      }
    });
  }

  public getAddreses($event) {
    let data = { state: this.stateSelected, city: this.citySelected };
    this.adminService.getAddressByStateCity(data).subscribe((res) => {
      if (res.success) {
        this.addresses = res.data;
      } else {
        this.message.error(
          "Failed to get address of the " + this.citySelected,
          { nzDuration: 2500 }
        );
      }
    });
  }
  deleteRow(id: string): void {
    this.addresses = this.addresses.filter((d) => d.id !== id);

    //to be implemented
  }

  reset(): void {
    this.searchValue = "";
    this.search();
  }
  resetCity(): void {
    this.searchCity = "";
    this.searchCities();
  }
  resetAddress(): void {
    this.searchAddres = "";
    this.searchAddresses();
  }

  search(): void {
    this.stateVisible = false;
    this.listOfStateData = this.areas.filter(
      // (item: any) => console.log(item)
      (item: any) => item.state.indexOf(this.searchValue) !== -1
    );
  }
  searchCities(): void {
    this.cityVisible = false;
    this.listOfStateData = this.areas.filter(
      (item: any) => item.city.indexOf(this.searchCity) !== -1
    );
  }
  searchAddresses(): void {
    this.addressVisible = false;
    this.listOfStateData = this.areas.filter(
      (item: any) => item.address.indexOf(this.searchAddres) !== -1
    );
  }
}
