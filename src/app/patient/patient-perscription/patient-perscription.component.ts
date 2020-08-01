import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {PatientService} from '../patient.service'
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { saveAs } from 'file-saver';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface prescription {
  date : Date;
  doctorName :string;
  appointmentNum :string;
  patientName : string;
  orderId : string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-patient-perscription',
  templateUrl: './patient-perscription.component.html',
  styleUrls: ['./patient-perscription.component.scss']
})
export class PatientPerscriptionComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private router : Router,
    private localService : AuthServiceLocal,
    private patientService : PatientService
  ) { }

  patientId : string;
  patientName : string
  ngOnInit() {
    let login = this.localService.isUserLoggedIn;
    if(!login) {
      this.router.navigateByUrl('/login')
      return
    }

    let role = this.localService.getUserRole();
    if(role == 'doctor') {
      this.router.navigateByUrl('/login')
      return
    }

    this.patientId = this.localService.getUserID;
    if(!this.patientId){
      this.router.navigateByUrl('/login');
      return
    }   
    
    this.patientName = this.localService.getUserName
    if(!this.patientName) {
      console.log("name not found")
    }

    this.getAllPrescription();
  }

  saveAllPrescription : any[] = []
  prescriptionTOshow : any[] = [];
  getAllPrescription(){
    console.log("reached")
    this.patientService.prescriptionGetall(this.patientId).subscribe((result)=>{
      console.log("all prescription are : ", result)
      if(result.success){
        this.saveAllPrescription = result
        this.addPrescription(result.data)
      }
    })
  }

  addPrescription(data){
    for(let i = 0; i < data.length; i++) {
      let add ;
      add = {
        date : data[i].orderId.orderDetails[0].dateOfCheckup,
        doctorName : data[i].doctorName,
        appointmentNum : data[i].orderId.appointmentNum,
        patientName : this.patientName,
        orderId : data[i].orderId._id
      }
      console.log("add ", add)
      this.prescriptionTOshow.push(add)
      
    }
    this.presCriptionDataSource = new MatTableDataSource(this.prescriptionTOshow);
    console.log(this.prescriptionTOshow)
    this.presCriptionDataSource.paginator = this.paginator
    console.log("prescription data source is  :", this.presCriptionDataSource)
  }

  presCriptionDataSource : MatTableDataSource<prescription[]>;
  displayedColumn: string[] = ['Prescription No.', 'Patient Name', 'Doctor Name', 'Appointment Number', "Download Prescription"];
  currentPDF : string = "";

  getPdf(orderId : string, action : string){
    console.log(orderId)
    this.patientService.appointmentFetchPDF(orderId).subscribe((result=>{
      console.log(result);
      if(result.success){

        this.completeImageUrl(result.data, action)
      } else {
        alert("something went wrong")
      }
    }),
    (err)=> console.log("something went wrong", err))
  }

  completeImageUrl(pdfUrl, action :string){
    let myurl = this.patientService.completeURl(pdfUrl)
    console.log("complete url is : ", myurl)
    if(action == 'view'){
      console.log("if")
      window.open(myurl ,  '_blank')
    } else {
      console.log("else")
      this.patientService.getPDFAsBlob(myurl).subscribe((result)=>{
        var blob = new Blob([result], {type: 'application/pdf'});
        saveAs(blob, "myPrescription");
      })
    }
  }

  applyFilter(filterText: string){
    this.presCriptionDataSource.filter = filterText.trim( ).toLowerCase()
  }
}
