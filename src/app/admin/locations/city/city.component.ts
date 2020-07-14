import { Component, OnInit } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
  public stateSelected: any;
  public states: any[];
  public cities: any[];
  public city: String;
  i = 0;
  editId: string | null = null;
  searchValue = "";
  visible = false;
  listOfStateData;

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {
    adminService.stateData$.subscribe((states) => {
      this.states = states;
    });
    adminService.citiesData$.subscribe((cities) => {
      this.cities = cities;
      this.listOfStateData = this.cities;
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
    if (this.city.length == 0) {
      this.message.error("Please provide city name", { nzDuration: 2500 });
      return;
    }
    this.message.loading("Saving city ...");
    const data = { state: this.stateSelected, city: this.city };
    this.adminService.saveCity(data).subscribe((data) => {
      this.message.remove("");
      this.message.success("City save successfully");
      if (data.success) {
        this.cities = [...this.cities, data.data];
        this.listOfStateData = this.cities;
      } else this.message.error(data.message, { nzDuration: 2500 });
    });

    this.i++;
  }

  deleteRow(id: string): void {
    this.cities = this.cities.filter((d) => d.id !== id);
  }

  reset(): void {
    this.searchValue = "";
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfStateData = this.cities.filter(
      // (item: any) => console.log(item)
      (item: any) => item.state.indexOf(this.searchValue) !== -1
    );
  }
}
