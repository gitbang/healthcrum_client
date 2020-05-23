import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { MapLocationSelectorComponent } from "../shared/map-location-selector/map-location-selector.component";
@Component({
  selector: "app-labs",
  templateUrl: "./labs.component.html",
  styleUrls: ["./labs.component.scss"],
})
export class LabsComponent implements OnInit {
  map_response: any;
  labFormGroup = this.fb.group({
    lab_name: new FormControl("", [Validators.required]),
    lab_logo: new FormControl("", [Validators.required]),
    lab_address: new FormControl("", [Validators.required]),
    lab_location: new FormControl("", [Validators.required]),
    lab_certification: new FormControl("", [Validators.required]),
    lab_working_from: new FormControl("", [Validators.required]),
    lab_working_to: new FormControl("", [Validators.required]),
    lab_open_time: new FormControl("", [Validators.required]),
    lab_close_time: new FormControl("", [Validators.required]),
    contract_number: new FormControl("", [Validators.required]),
    contract_file: new FormControl(),
    test_availables: new FormControl("", [Validators.required]),
  });
  certifications: string[] = ["NABL", "NABH", "NONE"];
  days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {}
  labContractChange(event: any) {}
  openMap() {
    const dialog = this.dialog.open(MapLocationSelectorComponent, {
      data: {
        result: this.map_response,
      },
      height: "90%",
      width: "80%",
    });
    dialog.afterClosed().subscribe((response) => {
      console.log("response ", response);
    });
  }
}
