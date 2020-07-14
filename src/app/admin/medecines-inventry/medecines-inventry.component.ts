import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { UploadFile } from "ng-zorro-antd/upload";
import { NzMessageService } from "ng-zorro-antd/message";
import { Observable, Observer, merge, of as observableOf } from "rxjs";
import { AdminService } from "app/services/admin.service";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
// import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
interface DataItem {
  name: string;
  age: number;
  address: string;
}
// interface ColumnItem {
//   name: string;
//   sortOrder?: NzTableSortOrder;
//   sortFn?: NzTableSortFn;
//   listOfFilter?: NzTableFilterList;
//   filterFn?: NzTableFilterFn;
//   filterMultiple?: boolean;
//   sortDirections?: NzTableSortOrder[];
// }
@Component({
  selector: "app-medecines-inventry",
  templateUrl: "./medecines-inventry.component.html",
  styleUrls: ["./medecines-inventry.component.scss"],
})
export class MedecinesInventryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "select",
    "Picture",
    "Name",
    "Brand",
    "Type",
    "Size",
    "Price",
  ];
  data: MatTableDataSource<any>;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngAfterViewInit() {
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  dataLoading: boolean = true;
  logo_image: any;
  cities: any[] = [];
  address: any[] = [];
  areas: any[] = [];
  primary = "primary";
  medicinesData: any[];
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
    variations: new FormControl(),
    variations_type: new FormControl(),
  });
  listOfStateData;
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
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private msg: NzMessageService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.adminService.getAllMedecines().subscribe((res) => {
      this.dataLoading = false;
      if (res.success) {
        this.medicinesData = res.data;
      }
    });
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.adminService.getAllMedecines().subscribe((data: any) => {
      this.isLoadingResults = false;
      this.resultsLength = data.data.length;
      this.data = new MatTableDataSource(data.data);
    });
  }

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
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

  fileChange(fileInput: any) {
    //read file from input
    let fileReaded = fileInput.target.files[0];

    let reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);

    reader.onload = (e) => {
      let csv: string = reader.result.toString();
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(",");
      let lines = [];
      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(",");
        if (data.length === headers.length) {
          let tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          // log each row to see output
          console.log(tarr);
          lines.push(tarr);
        }
      }
      // all rows in the csv file
      console.log(">>>>>>>>>>>>>>>>>", lines);
    };
  }
}
