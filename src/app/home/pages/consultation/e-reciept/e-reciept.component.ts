import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
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

  saveAsPDF(){
    var  element = document.getElementById('pdf')
    html2canvas(element).then((canvas)=>{

      //console.log(canvas.width, canvas.height)
      let imgData = canvas.toDataURL('image/png')
      let doc = new jspdf();
      let height = canvas.height * 208  / canvas.width;
      console.log("height is", height)
      doc.addImage(imgData, 0, 0, 208, 105);
      //doc.save();
      doc.output('dataurlnewwindow'); 
    })
  }
}
