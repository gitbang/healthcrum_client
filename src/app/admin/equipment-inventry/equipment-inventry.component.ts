import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { UploadFile } from "ng-zorro-antd/upload";
import { NzMessageService } from "ng-zorro-antd/message";
import { Observable, Observer } from "rxjs";

@Component({
  selector: "app-equipment-inventry",
  templateUrl: "./equipment-inventry.component.html",
  styleUrls: ["./equipment-inventry.component.scss"],
})
export class EquipmentInventryComponent implements OnInit {
  equipmentData: any[] = [];
  dataLoading: boolean = false;
  logo_image: any;
  primary = "primary";
  categoriesData: any[];
  categoryName: String;
  subCategory: String;
  subSubCategory: String;

  isAnySelected;
  stateVisible;
  cityVisible;
  addressVisible;
  searchValue;
  searchAddress;
  search(){};
  reset(){};
  searchCity;
  resetCity(){};
  searchCities(){};
  searchAddresses(){};
  resetAddress(){};
  addCategory(){};
  addSubCategory(){};
  addSubSubCategory(){};

  
  register = this.fb.group({
    category: new FormControl(),
    subcategory: new FormControl(),
    subsubcategory: new FormControl(),
    for: new FormControl(),
    name: new FormControl(),
    mrp: new FormControl(),
    brand: new FormControl(),
    packagingSize: new FormControl(),
    manufacturedBy: new FormControl(),
    contents: new FormControl(),
    picUrl: new FormControl(),
    picName: new FormControl(),
    pictures: new FormControl(),
    inStock: new FormControl(),
  });

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private msg: NzMessageService
  ) {}

  ngOnInit() {}

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

  fileChange(fileInput: any) {
    //read file from input
    let fileReaded = fileInput.target.files[0];

    let reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);

    reader.onload = (e) => {
      let csv: string = reader.result.toString();
      let allTextLines = csv.split(/\r|\n|\r/);
      console.log(allTextLines);
      let headers = allTextLines[0].split(",");
      let lines = [];
      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(",");
        if (data.length === headers.length) {
          lines.push(data);
        }
      }
      // all rows in the csv file
      //console.log(">>>>>>>>>>>>>>>>>", lines);
    };
  }
}
