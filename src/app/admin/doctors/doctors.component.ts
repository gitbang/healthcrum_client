import { Component, OnInit } from "@angular/core";
import { MouseEvent } from "@agm/core";
import {
  NgWizardConfig,
  THEME,
  StepChangedArgs,
  NgWizardService,
} from "ng-wizard";

import {
  faUserMd,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.scss"],
})
export class DoctorsComponent implements OnInit {
  doc_icon = faUserMd;
  doc_add = faUserPlus;
  doc_edit = faUserEdit;
  phide: boolean = true;
  hide: boolean = true;
  genderList: string[] = ["Male", "Female", "other"];
  name: string;
  age: string;
  gender: string;
  register = this.fb.group({
    logo: new FormControl(),
    name: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
    add: new FormControl(),
    gender: new FormControl(),
    experience: new FormControl(),
    qualification: new FormControl(),
    consultationFees: new FormControl(),
    address: new FormControl(),
    languages: new FormControl(),
    profilepic: new FormControl(),
    picName: new FormControl(),
    contact_number: new FormControl(),
    emergency: new FormControl(),
    video: new FormControl(),
    tele: new FormControl(),
    physical: new FormControl(),
    chat: new FormControl(),
    emergency_from: new FormControl(),
    emergency_to: new FormControl(),
    video_from: new FormControl(),
    video_to: new FormControl(),
    tele_from: new FormControl(),
    tele_to: new FormControl(),
    physical_from: new FormControl(),
    physical_to: new FormControl(),
    chat_from: new FormControl(),
    chat_to: new FormControl(),
    emergencyFees: new FormControl(),
    registrationNumber: new FormControl(),
    stream: new FormControl(),
    fromHealthcrum: new FormControl(),
  });
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
  };
  constructor(
    private ngWizardService: NgWizardService,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {}

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  zoom: number = 8;
  lat: number = 22.427095946682467;
  lng: number = 79.92415996874999;

  clickedMarker(label: string, index: number) {}

  mapClicked($event: MouseEvent) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
    this.getAddressDetails($event.coords.lat, $event.coords.lng);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    this.getAddressDetails($event.coords.lat, $event.coords.lng);
  }

  marker: marker = {
    lat: this.lat,
    lng: this.lng,
    label: "M",
    draggable: true,
  };

  public getAddressDetails(lat, long) {
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=ef023180e56342a193ff4b658e2f02dd`;
    this.httpClient.get(url).subscribe((res: any) => {
      console.log(res);
      if (res.results.length > 0) {
        let data = res.results[0].components;
        // let add_full = res.result[0].formatted;
        this.register.get("state").setValue(data.state);
        this.register.get("city").setValue(data.state_district);
        this.register.get("add").setValue(res.results[0].formatted);
      }
    });
  }
}

// interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
