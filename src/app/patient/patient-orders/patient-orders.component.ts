import { Component, OnInit } from "@angular/core";
import {AuthServiceLocal} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {PatientService} from '../patient.service'

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
    private localService : AuthServiceLocal,
    private patientService : PatientService
  ) {
    this.initializeOrders();
  }

  userId : string
  ngOnInit() {

    let isLogin = this.localService.isLoggin();
    if(!isLogin){
      this.router.navigateByUrl('/login')
    }
    let role = this.localService.getUserRole();
    if(role == 'doctor') {
      this.router.navigateByUrl('/login')
    } else {
      this.userId = this.localService.getUserID;
      this.getBookedBloodTest()
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

  getBookedBloodTest(){
    this.patientService.ordersgetBloodTest(this.userId).subscribe((result)=>{
      console.log(result);
      if(result.success){
        console.log("success")
        this.addBloodTest(result)
      } else {
        console.log("failure")
      }
    })
  }

  addBloodTest(result){
    console.log(result.data.length)
    this.bloodTests = []
    for(let i = 0; i < result.data.length; i++) {
      console.log("in loop")
      let add;
      add = {
        orderId : result.data[i]._id,
        orderNumber : result.data[i].orderNumber,
        totalamount : result.data[i].amountDetails.amount,
        orderDetails :  result.data[i].orderDetails
      }
      this.bloodTests.push(add);
    }
    console.log(this.bloodTests)
  }

  bloodTests = [
    {
      orderId : "",
      orderNum : "1234",
      testName : "Blood Test",
      type : "Package Test",
      members : 4,
      price : 2000,
      totalamount : 8000,
      orderDetails : []
    }
  ]
}
