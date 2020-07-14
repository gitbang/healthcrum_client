import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { NzMessageService } from "ng-zorro-antd/message";

interface ItemData {
  id: string;
  name: string;
}
@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class AddressComponent implements OnInit {
  public stateSelected: any;
  public citySelected: any;
  public states: any[];
  public cities: any[];
  public addresses: any[];
  public address: String;
  i = 0;
  editId: string | null = null;
  searchValue = "";
  searchCity: String = "";
  stateVisible = false;
  cityVisible = false;
  listOfStateData: any[];

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {
    adminService.stateData$.subscribe((states) => {
      this.states = states;
    });

    // adminService.citiesData$.subscribe((cities) => {
    //   this.cities = cities;
    //   this.listOfStateData = this.cities;
    // });

    adminService.addressData$.subscribe((addresses) => {
      this.addresses = addresses;
      this.listOfStateData = this.addresses;
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
    };
    this.adminService.saveAddress(data).subscribe((data) => {
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
  deleteRow(id: string): void {
    this.addresses = this.addresses.filter((d) => d.id !== id);

    //to be implemented
  }

  reset(): void {
    this.searchValue = "";
    this.searchState();
  }

  searchState() {
    this.stateVisible = false;
    this.listOfStateData = this.addresses.filter(
      // (item: any) => console.log(item)
      (item: any) => item.state.indexOf(this.searchValue) !== -1
    );
  }
  searchCities(): void {
    this.cityVisible = false;
    this.listOfStateData = this.addresses.filter(
      (item: any) => item.city.indexOf(this.searchValue) !== -1
    );
  }
}
