import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'app/services/admin.service';
import Swal from "sweetalert2";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  loadingUnapproved:boolean = false;
  loadingApproved:boolean = false;
  unapprovedData = [];
  approvedData = [];

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllPendingAppointments();
  }

  getAllPendingAppointments(){
    this.approvedData = [];
    this.unapprovedData = [];
    this.loadingUnapproved = true;
    this.adminService.getAllPendingConsultations({}).subscribe((res:any)=>{
      this.loadingUnapproved = false;
      if(res.success){
        this.unapprovedData = res.data;
      }
    })
  }

  getAllApprovedAppointments(){
    this.approvedData = [];
    this.unapprovedData = [];
    this.loadingApproved = true;
    this.adminService.getAllApprovedConsultations({}).subscribe((res:any)=>{
      this.loadingApproved = false;
      if(res.success){
        this.approvedData = res.data;
      }
    })
  }
  
  approveConsultation(i,status){
    this.loadingUnapproved = true;
    let data = {status:status};
    this.adminService.updatePendingConsultations(data,this.unapprovedData[i].orderDetail._id).subscribe((res:any)=>{
      this.loadingUnapproved = false;
      if(res.success){
        this.getAllPendingAppointments();
        Swal.fire("Success!","Consultaion approved successfully","success");
      }else{
        Swal.fire("Error!","Failed to approve patient consultaion","error");
      }
    },err=>{
      this.loadingUnapproved = false;
      Swal.fire("Sorry!","There is some Network issue. Try after sometimes","error");
    })
  }

  openDialog(i){
    this.dialog.open(AppointmentViewDialog, {
      minWidth: '80vw',
      data: this.unapprovedData[i]
    });
  }
  
  openApprovedDialog(i){
    this.dialog.open(AppointmentViewDialog, {
      minWidth: '80vw',
      data: this.approvedData[i]
    });
  }
}


@Component({
  selector: 'appointment-view-dialog',
  templateUrl: 'appointment-view-dialog.html',
})
export class AppointmentViewDialog {

  constructor(
    public dialogRef: MatDialogRef<AppointmentViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}