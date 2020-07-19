import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/services/admin.service';

@Component({
  selector: 'app-employess',
  templateUrl: './employess.component.html',
  styleUrls: ['./employess.component.scss']
})
export class EmployessComponent implements OnInit {

  corporateData: any[] = [];
  success: boolean = false;
  branchData: any[] = [];
  departmentData:any[] = [];
  hrData: any[] = [];
  dataLoading: boolean = true;
  corporateSelected:string = "";
  branchSelected:String = "";
  newEmployeeRegistration:boolean = false;
  constructor(private adminService: AdminService,) { }

  ngOnInit() {
    this.getAllCorporates();
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

  getBranchByCorporate(company) {
    this.adminService
      .getBranchesByCorporate({ corporate_id: company })
      .subscribe((res: any) => {
        this.branchData = [];
        if (res.success) {
          this.branchData = res.data;
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
    this.newEmployeeRegistration = true;
    this.adminService
    .getDepartmentByCorporate(data)
    .subscribe((res: any) => {
      this.newEmployeeRegistration = false;
      this.departmentData = [];
      if (res.success) {
        this.departmentData = res.data;
      }else{
        alert("something went wrong. Try Later!")
      }
    });
  }

  disApproveEmployee(_id){

  }
  
  approveEmployee(){
    if(this.corporateSelected == ""){
      alert("please select corporate");
      return;
    }
    if(this.branchSelected == ""){
      alert("please select any branch");
      return;
    }
  }

  getRegisteredEmployees(){
    if(this.corporateSelected == ""){
      alert("please select corporate");
      return;
    }
    if(this.branchSelected == ""){
      alert("please select any branch");
      return;
    }
  }
}
