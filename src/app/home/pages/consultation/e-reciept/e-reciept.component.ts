import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {MatDialogRef} from '@angular/material'

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'

// import pdfMake from 'pdfmake/build/pdfmake'
// import  pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-e-reciept',
  templateUrl: './e-reciept.component.html',
  styleUrls: ['./e-reciept.component.scss']
})
export class ERecieptComponent implements OnInit {

  constructor(private dialog : MatDialogRef<ERecieptComponent>) { }

  @ViewChild('content', {static : true}) content : ElementRef
  ngOnInit() {
  }


  eData = {
    name : 'Karan',
    billno : "FL1236547",
    gender : 'male',
    fshplId : "15245321",
    requestDate : '10/12/2020',
    checkupDate : '10/12/2020',
    centerName : 'Mohali',
    serviceProvider : 'Dr Meena',
    type : "Video Consultation",
    mrp : 2000,
    discountPrice : 1000,
    totalPrice : 1000,
    gstPercent : 18,
    gstAmount : 180,
    total : 1180,
    paymentMode : 'card',
    status : 'confirmed'
  }

  
  saveAsPDF(){
    //var  element = document.getElementById('pdf')
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
  }

  closeDialog(){
    this.dialog.close({success : true})
  }
}
