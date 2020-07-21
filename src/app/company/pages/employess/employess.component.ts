import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/services/admin.service';
import { CompanyService } from 'app/company/company.service';
import { AuthServiceLocal } from 'app/services/auth-service.service';

@Component({
  selector: 'app-employess',
  templateUrl: './employess.component.html',
  styleUrls: ['./employess.component.scss']
})
export class EmployessComponent implements OnInit {

  success: boolean = false;
  verifiedEmployeeData:any[] = [];
  dataLoading: boolean = true;
  registeredEmployeeLoading:boolean = false;
  employeeRegisterFile:any;
  bulkEmployeeData:any[];
  bulkEmployeeLoading:boolean = false;
  bulkEmployeeUploaded = false;
  uploadFile:File;
  bulkTitle:any[] = [];
  bulkData:any[] = [];
  rejected = false;
  message = "";

  corporateSelected:string = "";
  branchSelected:string = "";

  constructor(private companyService: CompanyService, private authLocal: AuthServiceLocal,) { 
      this.corporateSelected = this.authLocal.getUserCorporateID;
      this.branchSelected = this.authLocal.getUserBranchID;
  }

  ngOnInit() {
    this.getAllVerifiedEmployeesByCorporate();
  }

getAllVerifiedEmployeesByCorporate(){
  
  const data = {
    companyId:this.corporateSelected,
    branchId: this.branchSelected
  }
  this.registeredEmployeeLoading = true;
  this.companyService.getVerifiedEmployeesByCorporate(data).subscribe((res:any)=>{
    this.registeredEmployeeLoading = false;
    if(res.success){
      this.verifiedEmployeeData = [];
      this.verifiedEmployeeData = res.data;
    }
  })
}


  uploadFileChange(event){
    this.bulkEmployeeLoading = true;
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
      this.bulkEmployeeLoading = false;
  }
     reader.readAsText(event.target.files[0]);
     this.uploadFile = event.target.files[0];
    //  console.log(this.uploadFile);  
  }
  bulkRegisterEmployees(){
   
    if(this.employeeRegisterFile == null || this.employeeRegisterFile == ""){
      alert("please provide file to register employees");
      return;
    }
    this.bulkEmployeeLoading = true;
    let fd = new FormData();
    fd.append("csvEmpData",this.uploadFile);
    fd.append("companyId",this.corporateSelected);
    fd.append("branchId",this.branchSelected);
    this.companyService.bulkEmployeeRegistration(fd).subscribe((res:any)=>{
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
