import { Component, OnInit } from '@angular/core';
import { AuthServiceLocal } from 'app/services/auth-service.service';
import { HomeServiceService } from 'app/home/home-service.service';
import { Router } from '@angular/router';
import swal from "sweetalert2";
@Component({
  selector: 'app-hrlogin',
  templateUrl: './hrlogin.component.html',
  styleUrls: ['./hrlogin.component.scss']
})
export class HrloginComponent implements OnInit {

  user_email: String;
  user_pass: String;
  forgot_email: string;
  constructor(
    private authLocal: AuthServiceLocal,
    private service : HomeServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  loginLocal(){
    let data = {
      username: this.user_email,
      password: this.user_pass
    }
    this.service.hrLogin(data).subscribe((res:any)=>{
        if(res.success){
          let userDetails = {
            userId: res.data._id,
            healthcrumId:res.data.healthcrumId,
            companyId:res.data.corporate_id._id,
            branchId: res.data.branch_id._id,
            departmentId:"Hr",
            role:"hr",
            name:res.data.hr_name,
            email:res.data.hr_email,
            empId: res.data.hr_id
          };
          this.authLocal.saveTokenAndRole(userDetails);
          this.authLocal.saveUserToken(res.data._id);
          this.router.navigate(["/company"])
        }else{
          swal.fire("Error!", res.message, "error");
        }
    })
  }
  sendResetLink(){}
}
