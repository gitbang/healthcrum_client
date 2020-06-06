import { Component, OnInit } from '@angular/core';

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
}
