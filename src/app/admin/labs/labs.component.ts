import { Component, OnInit } from "@angular/core";
import { MouseEvent } from "@agm/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { UploadFile } from "ng-zorro-antd/upload";
import { Observable, Observer } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
// import { MapLocationSelectorComponent } from "../shared/map-location-selector/map-location-selector.component";
@Component({
  selector: "app-labs",
  templateUrl: "./labs.component.html",
  styleUrls: ["./labs.component.scss"],
})
export class LabsComponent implements OnInit {
  map_response: any;
  logo_image: any;
  bookappointment;
  labFormGroup = this.fb.group({
    lab_name: new FormControl("", [Validators.required]),
    lab_logo: new FormControl("", [Validators.required]),
    lab_state: new FormControl("", [Validators.required]),
    lab_city: new FormControl("", [Validators.required]),
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
  zoom: number = 8;
  lat: number = 22.427095946682467;
  lng: number = 79.92415996874999;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private msg: NzMessageService
  ) {}

  ngOnInit() {}
  labContractChange(event: any) {}
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
        this.labFormGroup.get("lab_state").setValue(data.state);
        this.labFormGroup.get("lab_city").setValue(data.state_district);
        this.labFormGroup.get("lab_address").setValue(res.results[0].formatted);
      }
    });
  }
  previewImage: string | undefined = "";
  previewVisible = false;
  fileList: UploadFile[] = [];
  fileType: string = "image/*";
  loading = false;
  avatarUrl?: string;

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
    console.log(this.fileList);
  };

  beforeUpload = (file: UploadFile, _fileList: UploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.msg.error("You can only upload JPG file!");
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error("Image must smaller than 2MB!");
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };
  private getBase642(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  handleLogoChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case "uploading":
        this.loading = true;
        break;
      case "done":
        // Get this url from response in real world.
        this.logo_image = info.file.response;
        this.getBase642(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case "error":
        this.msg.error("Network error");
        this.loading = false;
        break;
    }
  }
}

// interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
