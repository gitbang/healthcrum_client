import { Component, OnInit, ElementRef, ViewChild, Inject, NgZone } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HomeServiceService} from '../../../home-service.service'

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'
import { faBaby } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-e-reciept',
  templateUrl: './e-reciept.component.html',
  styleUrls: ['./e-reciept.component.scss']
})
export class ERecieptComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<ERecieptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone,
    private service : HomeServiceService
    ) {
      this.dialogRef.disableClose = true
      console.log("data in e-receipt", data)
      this.fromCart = data.fromCart;
      this.userId = data.user._id;
      this.orderId = data.orderId;
      console.log("from cart ", this.fromCart)
  }
  
  showPdf : boolean = false;
  @ViewChild('content', {static : true}) content : ElementRef
  ngOnInit() {

    setTimeout(() => {
      this.generatePDF();
    },1000);
  }

  fromCart  : boolean;
  userId : string;

  eData = {
    name : this.data.user.name,
    billno : this.data.orderId,
    gender : this.data.user.gender,
    fshplId : this.data.razorpay_payment_id,
    requestDate : this.data.date,
    checkupDate : this.data.orderDetails[0].dateOfCheckup,
    centerName : 'Mohali',
    serviceProvider : this.data.serviceProvider,
    type : this.data.type,
    mrp : this.data.save != null ? (parseInt(this.data.save)  + parseInt(this.data.amount)) : parseInt(this.data.amount),
    discountPrice : this.data.save,
    // totalPrice : 1000,
    // gstPercent : 18,
    // gstAmount : 180,
    total : this.data.amount,
    paymentMode : 'card',
    status : 'confirmed'
  }
  orderId : string;
  pdf :  jspdf

  generatePDF(){

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
    
      this.pdf = pdf

      var data = new Blob([pdf.output()]);
    
      let fd = new FormData();

      //console.log("complete data",this.data.complete)
      fd.append("paymentDataPdf", data)
     
      this.service.saveBilPaymentPdf(this.orderId, fd).subscribe((result)=>{
        console.log(result);
       if(result.success){
          console.log("PDF is saved")
          if(this.fromCart) {
            if(this.eData.type == 'bloodTest') {
              this.service.bloodTestClearCart(this.userId, {type : "bloodTest"}).subscribe((result)=>{
                console.log("clear cart result ", result)
                if(result.success){
                  console.log("cart is cleared")
                }
              })
            }
            this.service.addCompleteDetailsToCart([])
            this.service.changeMessage([])
            this.service.deleteCartFromLocalStorage()
          }
        } else {
          alert("Something went wrong")
        }
      })
      
    })
  }

  saveAsPDF(){
    this.pdf.save("payment.pdf")
  }

  closeDialog(){
    this.ngZone.run(() => {
      this.dialogRef.close({success : true});
    })
  }
}
