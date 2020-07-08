import { Component, OnInit, ElementRef, ViewChild, Inject, NgZone } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-e-reciept',
  templateUrl: './e-reciept.component.html',
  styleUrls: ['./e-reciept.component.scss']
})
export class ERecieptComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<ERecieptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone
    ) {
      this.dialogRef.disableClose = true
      console.log(data)
  }
  
  @ViewChild('content', {static : true}) content : ElementRef
  ngOnInit() {
  }


  eData = {
    name : this.data.user.name,
    billno : this.data.razorpay_order_id,
    gender : this.data.user.gender,
    fshplId : this.data.razorpay_payment_id,
    requestDate : this.data.date,
    //checkupDate : '10/12/2020',
    centerName : 'Mohali',
    serviceProvider : 'Dr Meena',
    type : this.data.type,
    mrp : parseInt(this.data.save)  + parseInt(this.data.amount) ,
    discountPrice : this.data.save,
    // totalPrice : 1000,
    // gstPercent : 18,
    // gstAmount : 180,
    total : this.data.amount,
    //paymentMode : 'card',
    status : 'confirmed'
  }

  
  saveAsPDF(){
    
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
    this.ngZone.run(() => {
      this.dialogRef.close({success : true});
    })
  }
}
