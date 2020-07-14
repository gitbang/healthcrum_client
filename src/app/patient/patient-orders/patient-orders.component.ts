import { Component, OnInit } from "@angular/core";
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: "app-patient-orders",
  templateUrl: "./patient-orders.component.html",
  styleUrls: ["./patient-orders.component.scss"]
})
export class PatientOrdersComponent implements OnInit {
  pendingOrders: any[] = [];
  doneOrders: any[] = [];

  constructor(
    private router : Router,
    private localService : AuthServiceLocal
  ) {
    this.initializeOrders();
  }

  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role == 'doctor') {
      this.router.navigateByUrl('/login')
    }
  }

  initializeOrders() {
    for (let i = 0; i < 10; i++) {
      let data = {
        product_img: "../../../assets//img/product1.jpg",
        product_name: "Cortic 324",
        product_price: 2039,
        product_qty: 2,
        product_seller: "Pharmacy",
        product_type: "type",
        product_size: 100
      };
      this.pendingOrders.push(data);
      this.doneOrders.push(data);
    }
  }

  increaseQty(index) {
    this.pendingOrders[index].product_qty =
      this.pendingOrders[index].product_qty < 5
        ? this.pendingOrders[index].product_qty + 1
        : 5;
  }

  decreaseQty(index) {
    this.pendingOrders[index].product_qty =
      this.pendingOrders[index].product_qty > 0
        ? this.pendingOrders[index].product_qty - 1
        : 0;
  }
}
