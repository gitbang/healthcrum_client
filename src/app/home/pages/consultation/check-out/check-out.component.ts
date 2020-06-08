import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ERecieptComponent } from '../e-reciept/e-reciept.component';
import { HomeServiceService } from 'app/home/home-service.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog : MatDialog,
    private service : HomeServiceService
  ) { }

  @ViewChild('content', {static : true}) content : ElementRef
  ngOnInit() {
    this.service.consultationDoctorSelectedData.subscribe(result=>{
      console.log(result);
      this.completeData = result
    })
  }
  completeData;
  shownresultarrays =[
      { 
      _id : '',  
      mobileNo : 9874563210,
      docname : "Dr. AR Kapoor", 
      healcrumprice : 2500, 
      offerprice : 2000,
      type: "video",          // telephone, physical , chat
      timeslot : '06:30am',
      date : '10/12/2020',
      amount : 1500,
      saved : 100,
    }, 
  ]
  placeorder(){
    console.log("place order go to gateway")
    // call the api for the payment gateway
    //this.router.navigateByUrl('consultation/e-reciept')
    const dialog = this.dialog.open(ERecieptComponent, {
      height : "90vh",
      width : "60%"
    })

    dialog.afterClosed().subscribe(result=>{
      this.router.navigateByUrl("consultation")
    })
  }


  saveAsPDF(){
   // var  element = document.getElementById('pdf')
    let element = this.content.nativeElement
      console.log("check-out")
      html2canvas(element, {scrollY : -window.scrollY}).then(canvas => {
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save('new-file.pdf'); // Generated PDF
      })
      /*
      let doc = new jspdf();

      let specificelemrnthandler = {
        '#editor' : function(element, renderer) {
          return true
        }
      };

      let content = this.content.nativeElement;

      doc.fromHTML(content.innerHTML, 15, 15, {
        'width' : 190,
        'elementHandlers' : specificelemrnthandler
      })
      doc.save('test.pdf')
      */
  }


  eData = {
    name : 'Karan',
    gender : 'male',
    requestDate : '10/12/2020',
    checkupDate : '10/12/2020',
    centerName : 'Mohali',
    serviceProvider : 'Dr Meena',
    mrp : 2000,
    discountPrice : 1000,
    totalPrice : 1000,
    gstPercent : 18,
    gstAmount : 180,
    total : 1180,
    paymentMode : 'card',
    status : 'confirmed'
  }
}
