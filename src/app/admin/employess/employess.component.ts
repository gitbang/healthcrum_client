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
  nonVerifiedEMployeeData:any[] = [];
  verifiedEmployeeData:any[] = [];
  hrData: any[] = [];
  dataLoading: boolean = true;
  corporateSelected:string = "";
  branchSelected:string = "";
  newEmployeeRegistration:boolean = false;
  registeredEmployeeLoading:boolean = false;
  employeesIDtoApprove:any[] = [];
  employeeRegisterFile:any;
  bulkEmployeeData:any[];
  bulkEmployeeLoading:boolean = false;
  bulkEmployeeUploaded = false;
  uploadFile:File;
  bulkTitle:any[] = [];
  bulkData:any[] = [];
  rejected = false;
  message = "";

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getNonVerifiedEmployees();
    this.getAllCorporates();
    this.getAllVerifiedEmployees();
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

getNonVerifiedEmployees(){
  this.newEmployeeRegistration = true;

  this.adminService.getNonVerifiedEmployees().subscribe((res:any)=>{
    this.newEmployeeRegistration = false;
    if(res.success){
      this.nonVerifiedEMployeeData = [];
      this.nonVerifiedEMployeeData = res.data;
    }
  })
}

getAllVerifiedEmployees(){
  this.registeredEmployeeLoading = true;
  this.adminService.getAllVerifiedEmployees().subscribe((res:any)=>{
    this.registeredEmployeeLoading = false;
    if(res.success){
      this.verifiedEmployeeData = [];
      this.verifiedEmployeeData = res.data;
    }
  })
}

getAllVerifiedEmployeesByCorporate(){
  if(this.corporateSelected == ""){
    alert("please select corporate");
    return;
  }
  if(this.branchSelected == ""){
    alert("please select any branch");
    return;
  }
  const data = {
    companyId:this.corporateSelected,
    branchId: this.branchSelected
  }
  this.registeredEmployeeLoading = true;
  this.adminService.getVerifiedEmployeesByCorporate(data).subscribe((res:any)=>{
    this.registeredEmployeeLoading = false;
    if(res.success){
      this.verifiedEmployeeData = [];
      this.verifiedEmployeeData = res.data;
    }
  })
}

disApproveEmployee(_id){

}

  employeeToApprove(checked,userId){
    if(checked){
      this.employeesIDtoApprove.push(userId);
    }else{
      this.employeesIDtoApprove.splice(this.employeesIDtoApprove.indexOf(userId),1);
    }
    console.log(this.employeesIDtoApprove);
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
    if(this.employeesIDtoApprove.length <= 0){
      alert("select employee to approve");
      return;
    }
    const data = {
      companyId: this.corporateSelected,
      branchId: this.branchSelected,
      users: this.employeesIDtoApprove
    }
    this.adminService.verifyBulkNonVerifiedEmployee(data).subscribe((res:any)=>{
        if(res.success){
          this.getNonVerifiedEmployees();
        }
    })
  }

  uploadFileChange(event){
    let reader=new FileReader();
    reader.onload = (e) => {
      this.rejected = false;
      this.bulkTitle = [];
      this.bulkData = [];
      this.bulkTitle =reader.result.toString().split('\n')[0].split(',');
      for(let i=1;i<reader.result.toString().split('\n').length ;i++){
        if(reader.result.toString().split('\n')[i].split(',').length > 1)
            this.bulkData.push(reader.result.toString().split('\n')[i].split(','))
      }
  }
     reader.readAsText(event.target.files[0]);
     this.uploadFile = event.target.files[0];
    //  console.log(this.uploadFile);  
  }
  bulkRegisterEmployees(){
    if(this.corporateSelected == ""){
      alert("please select corporate");
      return;
    }
    if(this.branchSelected == ""){
      alert("please select any branch");
      return;
    }
    if(this.employeeRegisterFile == null || this.employeeRegisterFile == ""){
      alert("please provide file to register employees");
      return;
    }
    this.bulkEmployeeLoading = true;
    let fd = new FormData();
    fd.append("csvEmpData",this.uploadFile);
    fd.append("companyId",this.corporateSelected);
    fd.append("branchId",this.branchSelected);
    this.adminService.bulkEmployeeRegistration(fd).subscribe((res:any)=>{
      this.bulkEmployeeLoading = false;
      this.employeeRegisterFile = "";
      if(res.success){
        if(res.dataReject){
          this.message = res.message;
          this.rejected = true;
          let temp = [];
          res.rejectedData.forEach(el => {
            
            try{
              let t = this.bulkData.filter(emp => {return emp.includes(el.email)});
            temp.push(t.length > 0 ? t[0] : []);
            }catch(err){
                console.log("dummy");
            }
          });
          this.bulkData = [];
          this.bulkData = temp;         
        }else{
          this.bulkData = [];
          this.bulkTitle = [];
          this.message = "";
          alert("Employee Registered Successfully !");
        }
      }
    })
    
  }

}
