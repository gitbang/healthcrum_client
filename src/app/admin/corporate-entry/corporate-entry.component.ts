import { Component, OnInit, TemplateRef, Inject } from "@angular/core";
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
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
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
  hrDataLoading:boolean = false;
  dataLoading: boolean = true;
  branchDataLoading: boolean = true;
  departmentDataLoading: boolean = true;
  registeringCorporateLoader:boolean = false;
  registeringBranchLoader:boolean = false;
  registeringHrLoader:boolean = false;
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
  hr_update_activated = false;
  hr_update:any = {};
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private msg: NzMessageService,
    private adminService: AdminService,
    private notification: NzNotificationService,
    public dialog: MatDialog
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
    this.registeringCorporateLoader = true;
    this.adminService.addCorporate(data).subscribe((res) => {
      this.registeringCorporateLoader = false;

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
    this.registeringBranchLoader = true;
    this.adminService.addBranch(data).subscribe((res: any) => {
      this.registeringBranchLoader = false;
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

  setHrUpdate(id){
    this.getHRById(id);
  }

  cancelHRUpdate(template: TemplateRef<{}>){
    this.hr_update = {};
    this.hr_update_activated = false;
    this.showError(template,"Hr Detail update cancelled !");
  }

  updateHrDetails(template: TemplateRef<{}>){
    
    if(this.hr_update_activated){
      let data = this.hr.value;
    this.top_loading = true;
      data["healthcrumId"] = this.hr_update.healthcrumId;
      data["id"] = this.hr_update.id;
      this.adminService.updateHRById(data).subscribe((res:any)=>{
        console.log(res);
        try{
          if(res.success){
            this.getAllHrs();
          this.hr.reset();
          this.showSuccess(template,"Hr details updated Successfully");
          }
        else
            this.showError(template,res.message);
        }catch(err){
          this.showError(template,err);
        }
      });
    }
  }

  addHr(template: TemplateRef<{}>) {
    let data = this.hr.value;
    this.top_loading = true;
    this.registeringHrLoader = true;
      this.adminService.addCorporateHR(data).subscribe((res:any)=>{
        this.registeringHrLoader = false;
        try{
          if(res.success){
            this.showSuccess(template,"Hr Added Successfully");
            this.getAllHrs();
          }
        else
            this.showError(template,res.message);
        }catch(err){
          this.showError(template,err);
        }
      })
    
  }

  getAllHrs(){
    this.hrDataLoading = true;
    let data = {};
    this.adminService.getCorporateHr(data).subscribe((res:any)=>{
      this.hrDataLoading = false;
      console.log(res);
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


  getHRById(_id){
    let data = { id: _id};
    this.adminService.getHRById(data).subscribe((res:any)=>{
      console.log(res);
      if(res.success){
        this.hr_update_activated = true;
        this.hr.get("corporate_id").setValue(res.data.corporate_id);
        this.hr.get("branch_id").setValue(res.data.branch_id);
        this.hr.get("hr_id").setValue(res.data.hr_id);
        this.hr.get("hr_name").setValue(res.data.ht_name);
        this.hr.get("hr_contact").setValue(res.data.contact);
        this.hr.get("hr_email").setValue(res.data.hr_email);
        this.hr.get("hr_password").setValue("");
        this.hr.get("hr_cpassword").setValue("");
        this.hr_update["healthcrunId"] = res.data.healthcrunId;
        this.hr_update["id"] = res.data._id;
        window.scrollTo({top:0});
      }
    });
  }

  deleteCorporate(_id,template: TemplateRef<{}>){
    this.adminService.deleteCorporateById(_id).subscribe((res:any)=>{
      if(res.success){
        this.showSuccess(template,"Corporate removed successfully !");
        this.getAllCorporates();
      }else{
        this.showError(template,"Failed to remove Corporate");
      }
  })
  }

  deleteBranch(_id,template: TemplateRef<{}>){
    this.adminService.deleteBranchById(_id).subscribe((res:any)=>{
      if(res.success){
        this.showSuccess(template,"Branch deleted successfully !");
        this.getAllBranches();
      }else{
        this.showError(template,"Failed to delete branch");
      }
  })
  }


  deleteHrById(_id,template: TemplateRef<{}>){
    this.adminService.deleteHRById(_id).subscribe((res:any)=>{
        if(res.success){
          this.showSuccess(template,"Hr deleted successfully !");
          this.getAllHrs();
        }else{
          this.showError(template,"Failed to delete HR");
        }
    })
  }

  openDialog(i){
    this.dialog.open(HrViewDialog, {
      minWidth: '80vw',
      data: this.hrData[i]
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

@Component({
  selector: 'hr-view-dialog',
  styleUrls: ["./corporate-entry.component.scss"],
  templateUrl: 'hr-view-dialog.html',
})
export class HrViewDialog {

  constructor(
    public dialogRef: MatDialogRef<HrViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}