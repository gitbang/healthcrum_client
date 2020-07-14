import { Component, OnInit, TemplateRef } from "@angular/core";
// import { MapLocationSelectorComponent } from "../shared/map-location-selector/map-location-selector.component";
import { FormBuilder, FormControl } from "@angular/forms";
// import { MatDialog } from "@angular/material";
import { MouseEvent } from "@agm/core";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd/message";
import { UploadFile } from "ng-zorro-antd/upload";
import { Observable, Observer } from "rxjs";
import { AdminService } from "app/services/admin.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
@Component({
  selector: "app-corporate-entry",
  templateUrl: "./corporate-entry.component.html",
  styleUrls: ["./corporate-entry.component.scss"],
})
export class CorporateEntryComponent implements OnInit {
  corporateData: any[] = [];
  success: boolean = false;
  branchData: any[] = [];
  departmentData:any[] = [];
  specialMembers: any[] = [];
  hrData: any[] = [];
  dataLoading: boolean = true;
  branchDataLoading: boolean = true;
  departmentDataLoading: boolean = true;
  notification_title: String;
  notification_desc: String;
  top_loading: boolean = false;
  hide: boolean = true;
  phide: boolean = true;
  states: any[];
  cities: any[];
  selectedState: String;
  medecinesData;
  logo: any;
  corporateSelected:string = "";
  branchSelected:String = "";
  corporate_name: String;
  branchByCompany = this.fb.group({
    companySelected: new FormControl(),
  });

  branch = this.fb.group({
    corporate_id: new FormControl(),
    branch_name: new FormControl(),
    branch_state: new FormControl(),
    branch_city: new FormControl(),
    branch_address: new FormControl(),
    branch_email: new FormControl(),
    branch_contact: new FormControl(),
    branch_remark: new FormControl(),
    branch_start: new FormControl(),
    branch_end: new FormControl(),
  });

  department = this.fb.group({
    corporate_id: new FormControl(),
    branch_id: new FormControl(),
    name: "",
  });

  member = this.fb.group({
    lab_logo: new FormControl(),
    corporate_name: new FormControl(),
    contact_number: "",
  });
  checkup = this.fb.group({
    lab_logo: new FormControl(),
    corporate_name: new FormControl(),
    contact_number: "",
  });
  hr = this.fb.group({
    corporate_id: new FormControl(),
    branch_id: new FormControl(),
    hr_id: new FormControl(),
    hr_name: new FormControl(),
    hr_contact: new FormControl(),
    hr_email: new FormControl(),
    hr_password: new FormControl(),
    hr_cpassword: new FormControl(),
  });
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private msg: NzMessageService,
    private adminService: AdminService,
    private notification: NzNotificationService
  ) {
    adminService.stateData$.subscribe((states) => {
      this.states = states;
    });
    this.branch.get("branch_state").valueChanges.subscribe((res) => {
      this.getCities(res);
    });
    this.branchByCompany
      .get("companySelected")
      .valueChanges.subscribe((company) => {
        this.getBranchByCorporate(company);
      });
    this.department.get('corporate_id').valueChanges.subscribe((company) => {
      this.getBranchByCorporate(company);
    });

    this.hr.get('corporate_id').valueChanges.subscribe((company) => {
      this.getBranchByCorporate(company);
    });
  }

  ngOnInit() {
    this.getAllCorporates();
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

        this.logo = info.file.response;
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

  getAllCorporates() {
    this.dataLoading = true;
    this.adminService.getAllCorporate().subscribe((res) => {
      this.dataLoading = false;
      if (res.success) {
        this.corporateData = res.data;
      }
    });
  }

  //add corporate
  addCorporate(template: TemplateRef<{}>) {
    let data = {
      name: this.corporate_name,
      logo: {
        name: this.logo.name,
        thumbUrl: this.logo.thumbUrl,
        url: this.logo.url,
      },
    };
    this.top_loading = true;
    this.adminService.addCorporate(data).subscribe((res) => {
      this.top_loading = false;

      if (res.success) {
        this.getAllCorporates();
        this.success = true;
        this.notification_title = "Success !";
        this.notification_desc = "Corporate Added Successfully";
        this.notification.template(template);
      } else {
        this.success = false;
        this.notification_title = "Error !";
        this.notification_desc = "Failed to add corporate \n" + res.message;
        this.notification.template(template);
      }
    });
  }
  addBranch(template: TemplateRef<{}>) {
    let data = this.branch.value;
    this.top_loading = true;
    this.adminService.addBranch(data).subscribe((res: any) => {
      this.top_loading = false;
      if (res.success) {
        this.showSuccess(template, "Branch added successfully !");
        this.branchData.push(res.data);
      } else {
        this.showError(template, res.message);
      }
    });
  }

  addDepartment(template){
    const data = this.department.value;
    this.top_loading = true;
    this.adminService.addDepartment(data).subscribe((res: any) => {
      this.departmentData = [];
      this.top_loading = false;
      if (res.success) {
        this.showSuccess(template, "Department added successfully !");
        this.departmentData.push(res.data);
      } else {
        this.showError(template, res.message);
      }
    });
  }

  addHr(template: TemplateRef<{}>) {
    let data = this.hr.value;
    this.top_loading = true;

    this.adminService.addCorporateHR(data).subscribe((res:any)=>{
      try{
        if(res.success)
          this.showSuccess(template,"Hr Added Successfully");
      else
          this.showError(template,res.message);
      }catch(err){
        this.showError(template,err);
      }
    })
  }

  getAllHrs(){
    let data = {};
    this.adminService.getCorporateHr(data).subscribe((res:any)=>{
      if(res.success){
        this.hrData = [];
        this.hrData = res.data;
      }
    })
  }
  getBranchData() {
    this.getAllBranches();
    this.getStates();
  }
  getStates() {
    this.adminService.getStates().subscribe((data) => {
      this.adminService.setStatesData(data.data);
    });
  }

  public getCities(state) {
    let data = { state: state };
    this.adminService.getCity(data).subscribe((res) => {
      if (res.success) {
        this.cities = res.data;
      } else {
      }
    });
  }

  private showSuccess(template: TemplateRef<{}>, message: String) {
    this.success = true;
    this.notification_title = "Success !";
    this.notification_desc = message;
    this.notification.template(template);
  }

  private showError(template: TemplateRef<{}>, message: String) {
    this.success = false;
    this.notification_title = "Error !";
    this.notification_desc = message;
    this.notification.template(template);
  }

  getAllBranches() {
    this.branchDataLoading = true;
    this.adminService.getAllBranches().subscribe((res: any) => {
      console.log(res);
      this.branchDataLoading = false;
      if (res.success) {
        this.branchData = res.data;
      }
    });
  }

  getAllDepartments(){
    this.departmentDataLoading = true;
    this.adminService.getAllDepartment().subscribe((res: any) => {
      this.departmentDataLoading = false;
      if (res.success) {
        this.departmentData = res.data;
      }
    });
  }

  getDepartmentsByCorporate(){
    if(this.corporateSelected == ""){
      alert("please select corporate");
      return;
    }
    if(this.branchSelected == ""){
      alert("please select any branch");
      return;
    }
    const data = {corporate_id: this.corporateSelected, branch_id: this.branchSelected};
    this.departmentDataLoading = true;
    this.adminService
    .getDepartmentByCorporate(data)
    .subscribe((res: any) => {
      this.departmentDataLoading = false;
      this.departmentData = [];
      if (res.success) {
        this.departmentData = res.data;
      }else{
        alert("something went wrong. Try Later!")
      }
    });
  }

  getBranchByCorporate(company) {
    this.branchDataLoading = true;
    this.adminService
      .getBranchesByCorporate({ corporate_id: company })
      .subscribe((res: any) => {
        this.branchDataLoading = false;
        this.branchData = [];
        if (res.success) {
          this.branchData = res.data;
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
