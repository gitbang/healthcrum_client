import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { map, startWith } from "rxjs/operators";
import {
  faUserMd,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { MouseEvent } from "@agm/core";
import { HttpClient } from "@angular/common/http";
import { UploadFile } from "ng-zorro-antd/upload";
import { NzMessageService } from "ng-zorro-antd/message";
import { Observable, Observer } from "rxjs";

@Component({
  selector: "app-hospitals",
  templateUrl: "./hospitals.component.html",
  styleUrls: ["./hospitals.component.scss"],
})
export class HospitalsComponent implements OnInit {
  doc_icon = faUserMd;
  doc_add = faUserPlus;
  doc_edit = faUserEdit;
  phide: boolean = true;
  hide: boolean = true;
  genderList: string[] = ["Male", "Female", "other"];
  name: string;
  age: string;
  gender: string;

  fileList: UploadFile[] = [];
  logo_image: any;

  fileType: string = "image/*";
  register = this.fb.group({
    surgeryProcedure: "",
    name: new FormControl(),
    logo: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
    area: new FormControl(),
    address: new FormControl(),
    speciality: new FormControl(),
    beds: new FormControl(),
    facility: new FormControl(),
    discount: new FormControl(),
  });
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  loading = false;
  avatarUrl?: string;
  //Facility controller
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFacilitys: Observable<string[]>;
  facilitys: string[] = [];
  allfacilitys: string[] = [];

  @ViewChild("facilityInput", null) facilityInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto", null) matAutocomplete: MatAutocomplete;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private msg: NzMessageService
  ) {
    this.filteredFacilitys = this.register.get("facility").valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allfacilitys.slice()
      )
    );
  }

  ngOnInit() {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.facilitys.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
    this.register.get("facility").setValue(null);
  }

  remove(facility: string): void {
    const index = this.facilitys.indexOf(facility);

    if (index >= 0) {
      this.facilitys.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.facilitys.push(event.option.viewValue);
    this.facilityInput.nativeElement.value = "";
    this.register.get("facility").setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allfacilitys.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
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
        this.register.get("area").setValue(res.results[0].formatted);
      }
    });
  }

  previewImage: string | undefined = "";
  previewVisible = false;

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
