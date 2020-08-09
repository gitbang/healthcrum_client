import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'app/services/admin.service';
import Swal from "sweetalert2";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  
  loadingUnapproved:boolean = false;
  loadingApproved:boolean = false;
  unapprovedData = [];
  approvedData = [];

  constructor(private adminService : AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllPendingReports();
  }

  getAllPendingReports(){
    this.loadingUnapproved = true;
    let data = {};
      this.adminService.getAllPendingReports(data).subscribe((res:any)=>{
        this.loadingUnapproved = false;
        if(res.success){
          this.unapprovedData = res.data;
        }
      },(err)=>{
        this.loadingUnapproved = false;
      })
  }

  getAllApprovedReports(){
    this.loadingApproved = true;
    let data = {};
      this.adminService.getAllApprovedReports(data).subscribe((res:any)=>{
        this.loadingApproved = false;
        if(res.success){
          this.approvedData = res.data;
        }
      },(err)=>{
        this.loadingApproved = false;
      })
  }



  declineReport(i){

  }
openDialog(i){
  this.dialog.open(ReportViewDialog, {
    minWidth: '80vw',
    data: this.unapprovedData[i]
  });
}

openApprovedDialog(i){
  this.dialog.open(ReportViewDialog, {
    minWidth: '80vw',
    data: this.approvedData[i]
  });
}
  openUploadDialog(i): void {
    console.log(i);
    let data = {
      ord_id:this.unapprovedData[i].orderDetail._id,
      name: this.unapprovedData[i].userDetail.name,
      hid: this.unapprovedData[i].orderDetail.orderBy.healthcrumId
    }
    const dialogRef = this.dialog.open(ReportUploadDialog, {
      minWidth: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPendingReports();
    });
  }

}

@Component({
  selector: 'report-upload-dialog',
  templateUrl: 'report-upload-dialog.html',
})
export class ReportUploadDialog {

  report_file: File;
  ord_id: string;
  name:string;
  hid:string;
  loadingUnapproved:boolean = false;
  constructor(
    private adminService: AdminService,
    public dialogRef: MatDialogRef<ReportUploadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.ord_id = data.ord_id; this.name = data.name, this.hid = data.hid;}

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadReport(){
    this.loadingUnapproved = true;
    let formData = new FormData();
    formData.append('bt_report',this.report_file);
    console.log(formData,this.ord_id);
    this.adminService.updatePendingReports(formData,this.ord_id).subscribe((res:any)=>{
      this.loadingUnapproved = false;
      if(res.success){
        this.dialogRef.close();
        Swal.fire("Success!","Report Uploaded SUccessfully","success");
      }else{
        Swal.fire("Error!",res.message,"error");
      }
    },(err)=>{
      Swal.fire("Warning","Failed to connect to server. Try after sometime","warning");
    });
  }

  fileContractChange(event){
      this.report_file = event.target.files[0];
  }
}

@Component({
  selector: 'report-view-dialog',
  templateUrl: 'report-view-dialog.html',
})
export class ReportViewDialog {

  constructor(
    public dialogRef: MatDialogRef<ReportViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}