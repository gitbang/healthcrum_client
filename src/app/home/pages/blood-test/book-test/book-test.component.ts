import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import {Router, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import {HomeServiceService} from '../../../home-service.service'
import {MatDialog, MAT_DIALOG_DATA, MatChipInputEvent, MAT_HAMMER_OPTIONS} from '@angular/material'
import { AddMemberComponent } from '../add-member/add-member.component';
import {FormBuilder, FormArray, FormGroup, FormControl} from '@angular/forms'
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ERecieptComponent} from "../../consultation/e-reciept/e-reciept.component";
import {AuthServiceLocal} from '../../../../services/auth-service.service'

export interface Member {
  name: string;
}
declare var Razorpay: any; 
@Component({
  selector: 'app-book-test',
  templateUrl: './book-test.component.html',
  styleUrls: ['./book-test.component.scss']
})
export class BookTestComponent implements OnInit {

  //userId : string = "1234";
  userId : string// = "5e8efa895b324a3e4c97a278";
  constructor(
    private router : Router,
    private service : HomeServiceService,
    private dialog : MatDialog,
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private route: ActivatedRoute,
    private ngZone : NgZone,
    private AuthService : AuthServiceLocal,
   //private state: RouterStateSnapshot
  ) {
   }
   mycart ;
   promocodeComplete;
   promocodeList : string [];

  getUsercart(){
    this.service.currentCart.subscribe((result)=>{
      console.log("my cart", result)
      if(result.length > 0) {
        this.mycart = result
      }
    })
    this.service.currentCompleteCart.subscribe((result)=>{
      console.log("complete ", result);
      this.userCompleteCart = result;
      this.shownresultarrays = result
      // add code here to fetch local data
      if(this.userCompleteCart.length > 0) {
        this.balanceSide = true;
      } else {
          console.log("else executed")
          this.fireAlert();
      }
    })
    this.sumAfteroffer = 0;
    this.totalsum = 0;
    this.mycart = [];
    this.userCompleteCart.forEach(x =>{
      this.mycart.push(x._id)
      console.log("in loop : ", x)
      this.totalsum += x.marketprice;
      this.sumAfteroffer += x.offerprice;
    })
  
    this.addGrop(this.userCompleteCart.length);
  }   

  fireAlert() {
    this.router.navigateByUrl("blood-test")  
  }

  getSingleTest(){
    this.service.currentTest.subscribe(result => {
     // console.log("single test", result)
      this.sumAfteroffer = 0;
      this.totalsum = 0;
      this.userCompleteCart= result
      this.shownresultarrays = result
    })
    if(this.shownresultarrays.length > 0) {
      this.balanceSide = true;
    } else {
      this.fireAlert();
    }
    this.totalsum += this.shownresultarrays[0].marketprice;
    this.sumAfteroffer += this.shownresultarrays[0].offerprice;
    this.addGrop(this.userCompleteCart.length); 
  }

  totalsum : number = 0;
  sumAfteroffer : number = 0;
  isLogin : boolean = false;
  toshow : boolean = false;

  ngOnInit() {

    //this.isLogin= this.service.checkLogin();
    this.isLogin = this.AuthService.isLoggin();

    

    this.route.url.subscribe((result)=>{
      if(this.isLogin){
        this.userId = this.AuthService.getUserID
        this.myId = this.userId
        let userDetails = this.AuthService.getUserDetails();
        this.aboutUser._id = userDetails.userId;
        this.aboutUser.gender = userDetails.gender;
        this.aboutUser.name = userDetails.name;
        this.aboutUser.phone = userDetails.phone;
        this.getrelatives();
        
        if(result[1].path == "mycart") {
          this.cartfromServer();
          this.fromCart = true;
        } else {
          this.getSingleTest();
          this.fromCart = false 
        }

      } else {
        
        if(result[1].path == "mycart") {
          this.getUsercart();
          this.fromCart = true;
        } else {
          this.getSingleTest();
          this.fromCart = false 
        }

      }
    })
  }

  addGrop(length : number){
    console.log("in add grop : length", length)
    if(length > 0) 
      this.toshow = true
    else 
      this.toshow = false
    for(let i = 0; i < length; i++) {
      this.addgroup();
      this.testForMe(true,  i)
    }
    console.log("to show ", this.toshow)
  }

  myCartComplete;

  cartfromServer(){
    console.log("from server")
    this.service.bloodTestGetCartServer(this.userId).subscribe((result)=>{
      if(result.success){
        this.myCartComplete = [];
        this.mycart = []
        console.log("cart from backend", result)
        result.data.forEach(test =>{
          console.log("lab id",test.labId)
          let add;
          let offerprice = test.offerPrice;
          let marketprice = test.mrp
          let offers  = test.offerPrice / test.mrp * 100;
          
          offers = 100 - Math.round(offers)
          let parameters = 1
          if(test.individualTests) {
             parameters = test.individualTests.length;
          } 
         
          add = {...test, offer : offers, parameters :parameters, offerprice : offerprice, marketprice  : marketprice }
          this.myCartComplete.push(add)
          this.mycart.push(test._id)
        })
        console.log("my cart complete")
        console.log(this.myCartComplete)

        this.pushtoService()
        
      } else {
        console.log("success false", result)
      }
    })
  } 

  pushtoService(){
    this.service.changeMessage(this.mycart);
    this.service.addCompleteDetailsToCart(this.myCartComplete);
    this.getUsercart();
  }

  getfilteredMembers(){
    this.filteredMembers = this.memberCtrl.valueChanges.pipe(
      startWith(''),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allMembers.slice())
    );
  }

  fromCart : boolean 
  relativeData ;
  
  getrelatives(){
    this.service.bloodTestFetchMember(this.myId).subscribe((result)=>{
   //   console.log("result in get relatives api",result)
      if(result.success) {
        this.relativeData = result.data;
        this.getRelativesString(result)
      }
    })
  }

  getRelativesString(result : any){
    this.allMembers = [];
    result.data.members.forEach(mem =>{
      this.allMembers.push(mem.name)
    })
   // console.log("members from backend are : ", this.allMembers)
    this.getfilteredMembers();
  }


  add(event: MatChipInputEvent): void {
   //  console.log("add executed")
    const input = event.input;
    const value = event.value;
  //  console.log(input, value)
    if ((value || '').trim()) {
      this.members.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.memberCtrl.setValue(null);
  }

  remove(member: string, i: number): void {

    const index = this.testfor.value[i].otherlist.indexOf(member);
  
    if (index >= 0) {
    
      this.testfor.value[i].otherlist.splice(index, 1);
      this.allID.others.splice(index, 1);

      this.memberIDsTest.value[index].list.splice(index, 1);
    }
    this.calculateprice(i);
  }

  selected(event: MatAutocompleteSelectedEvent, index : number): void {

    this.memberInput.nativeElement.value = '';
    this.memberCtrl.setValue(null);
    
    console.log("event is : ", event)
    console.log(index)
    console.log(this.relativeData)

    if(!this.testfor.value[index].otherlist.includes(event.option.viewValue)) {

      this.testfor.value[index].otherlist.push(event.option.viewValue);  

      console.log("after name addes" , this.testfor)

      let relativeIndex;
      for(let i = 0; i < this.relativeData.members.length; i++) {
        if(event.option.viewValue == this.relativeData.members[i].name) {
          relativeIndex = i;
          break
        }
      }
      this.allID.others.push(this.relativeData.members[relativeIndex]._id)
      
      this.memberIDsTest.value[index].list.push(this.relativeData.members[relativeIndex]._id)
    }

   
    this.calculateprice(index);
  }

  _filter(value: string): string[] {
  
    const filterValue = value.toLowerCase();
    return this.allMembers.filter(option => option.toLowerCase().includes(filterValue));
  }

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  memberCtrl = new FormControl();
  memberarray = this.fb.array([
  ])
  filteredMembers: Observable<string[]>;
  members: string[] = [];
  allMembers: string[] = ['Member1', 'Member2', 'Member3', 'Member4', 'Member5'];

  membersobj = [
    {name : "Abc"},{name : "456"},{name : "123"},{name : "789"},{name : "741"},
  ]
  @ViewChild('memberInput', {static : false}) memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static : true}) matAutocomplete: MatAutocomplete;

  userlogin : boolean = true
  usercart ;
  userCompleteCart;
  show : boolean = false;

  myId : string //= "5e8efa895b324a3e4c97a278";

  shownresultarrays =[
    { name : "Blood Test", 
    _id : "",
    type : "",
    includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", 
    totaltest : 12, marketprize : 4200, marketprice : 2500, offerprice : 2000},
  ]

  balanceSide : boolean = false
  placeorderClass : string = ""
  
  testfor = this.fb.array([
  ])

  addgroup (){
    this.testfor.push(this.fb.group({
      me : [true],
      others : [false],
      otherlist : this.fb.array([])
    }))

    this.pricearray.push(this.fb.group({
      total : [],
      saved : [],
      totalcount : []
    }))

    this.memberIDsTest.push(this.fb.group({
      list : this.fb.array([])
    }))
  }
  
  changeStyle(event) {
    this.placeorderClass = event.type == 'mouseover' ? 'btn-success' : '';
  }

  addmore(){
    this.router.navigateByUrl('blood-test')
  }

  deletefromCart(index : number) {
    console.log(index)
    console.log(this.userCompleteCart)
    console.log("id to deleted",this.userCompleteCart[index]._id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
      if (result.value) {
        console.log(this.userCompleteCart[index])
        this.service.bloodTestDeleteCartServer(this.userId, this.userCompleteCart[index]._id)
        .subscribe((result)=>{
          if(result.success) {
            console.log(result)
            this.userCompleteCart.splice(index, 1);
            console.log("in delete", this.userCompleteCart)
            console.log(this.mycart)
            this.mycart.splice(index, 1);
            this.service.changeMessage(this.mycart);
            this.testfor.removeAt(index);
            this.pricearray.removeAt(index);
            
            this.sumall();
            if(this.fromCart) {                               // it checks whether user click on booknow or proceed.
              this.service.addCompleteDetailsToCart(this.userCompleteCart);
              this.getUsercart();
            } else {
              this.service.bookSingleTest(this.userCompleteCart);
              this.getSingleTest();
            }
            Swal.fire(
              'Deleted!',
              'Your packge has been deleted.',
              'success'
            )
          } else {
            console.log("unable to delete from cart", result)
          }
        })
      }
    })
  }
  
  addMember(){
    if(this.isLogin) {
      const dialog = this.dialog.open(AddMemberComponent, {
        data : {
          userId :this.userId,
          list :  this.allMembers
        }
      })
      dialog.afterClosed().subscribe((result)=>{
        if(result.success) {
          this.snackbar.open("New member", "Added", {
            duration : 2000
          })
          this.getrelatives();
        } else {
          this.snackbar.open("Something Went Wrong", '', {
            duration : 2000
          })
        }
      })
    } else {
      Swal.fire("Login first")
      this.saveUrlLocally()
      this.router.navigateByUrl('/login')
    }
  }

  saveUrlLocally(){
    this.AuthService.redirectSaveUrl(this.router.routerState.snapshot.url)
  }

  testForMe(value, index) {
   // console.log(this.userCompleteCart[index])
    this.testfor.value[index].me = value;
    if(value) {
      this.myfee = this.userCompleteCart[index].offerprice;
      this.allID.me = this.myId;
    } else {
      this.allID.me = "";
      this.myfee = 0
    }
    this.calculateprice(index);
  }

  testForMember(value, index) {
    this.testfor.value[index].others = value;
    if(value == false) {
      this.testfor.value[index].otherlist = [];
      this.otherfee = 0;
      this.calculateprice(index);
    }
  }

  // calculate price
  myfee : number = 0;
  otherfee : number = 0;
  totalPrice : number = 0;
  moneysaved : number = 0;
  pricearray = this.fb.array([]);

  calculateprice(index : number){

    this.otherfee = this.userCompleteCart[index].offerprice * this.testfor.value[index].otherlist.length;
    this.totalPrice = this.myfee + this.otherfee;
    let num = this.totalPrice / this.userCompleteCart[index].offerprice
    
    this.pricearray.value[index].totalcount = num;
    this.pricearray.value[index].saved = num * (this.userCompleteCart[index].marketprice - this.userCompleteCart[index].offerprice)
    this.pricearray.value[index].total = this.totalPrice;
    
    this.sumall();
  }

  sumall(){
    this.finalPrice = 0;
    this.moneysaved = 0;
    this.pricearray.value.forEach(item =>{
      this.finalPrice += item.total;
      this.moneysaved += item.saved;
    })
    this.totalPrice = 0;
    
    this.getEffectivePrice();
  }

  aboutUser = {
    _id : "5e8efa895b324a3e4c97a278",
    name : "Akash",
    gender : "Male",
    location : "Jalandhar",
    phone : "9779692376",
    healthcrumId : "Health1234"
  }
  getEffectivePrice(){
    this.effectivePrice = this.finalPrice - this.discountPrice;
  }

  allID = {
    me : this.myId,
    others : []
  }

  memberIDsTest = this.fb.array([])
  finalPrice : number = 0;
  effectivePrice : number = 0;
  discountPrice : number = 0;
  
  razorKeyGeneration(){
    if(this.isLogin){
      var razorOptions  = {
        amount : this.effectivePrice,
        currency : "INR"
      }
      this.service.RazorPayKeyGeneration(razorOptions).subscribe((response)=>{
        console.log(response)
        if(response.success){
          console.log("proceed for success")
  
          this.openRazorInterface(response.sub, response.key);
  
        } else {
          alert("Something went wront. Try again later")
          console.log("something went wrong")
        }
      })
    } else {
      Swal.fire('Login first')
      this.saveUrlLocally();
      this.router.navigateByUrl('/login')
    }
    
  }

  openRazorInterface(response, key){
      var _this = this
      var options = {
        "key": key, 
        "amount": response.amount, 
        "currency": response.currency,
        "name": this.aboutUser.name,
        "description": "Book Test",
        "order_id": response.id, 
        "handler":function(response1){
          _this.service.razorPayVerification(response1).subscribe((result)=>{
            console.log("after verification", result)
            if(result.success){

              // send api request to save the required details in the database
              _this.ngZone.run(()=>{
                _this.savePaymentData(response, response1);
              }) 
              
            }
          })
        },
        "prefill": { 
          "name" : this.aboutUser.name,
          "email" :"ab@gmail.com",
          "contact": this.aboutUser.phone
        },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    console.log("works");
  }
  
  generatePDf(complete){
    
    const eRecipt = this.dialog.open(ERecieptComponent, {
      height : "90vh",
      width : "70%",
      data :{
        ...complete,
        user : this.aboutUser,
        save : this.moneysaved,
        date : new Date,
        complete : complete,
        serviceProvider : "HealthCrum",
        fromCart : this.fromCart
      }
    })
    
    eRecipt.afterClosed().subscribe((result)=>{
      console.log(result)
      if(result.success){
        Swal.fire(
          'Great!',
          'You test is booked',
          'success'
        )
      }
      // if the test booking is from cart the send request to clear all the cart.
      // if(this.fromCart){
      //   //this.aboutUser._id
      // } else {

      // }
      this.router.navigateByUrl('/blood-test')
    })
  }
  
  savePaymentData(response, response1){

    console.log("members id :", this.memberIDsTest.value)
    console.log(this.shownresultarrays);
    console.log(this.testfor)

    response.amount = response.amount / 100;
    let complete = {};
    let orderDetail = []
    for(var i = 0; i < this.shownresultarrays.length; i++) {
      let add ;
      let date  = new Date()
      add = {
        productId : this.shownresultarrays[i]._id,
        type : this.shownresultarrays[i].type,
        forUser : this.testfor.value[i].me,
        forMembers : this.testfor.value[i].others,
        //memberIds : this.allID.others,
        memberIds : this.memberIDsTest.value[i].list,
        dateOfCheckup : "",
        memberName : this.testfor.value[i].otherlist,
        testName : this.shownresultarrays[i].name,
      }
      orderDetail.push(add)
    }
    console.log("final order details ", orderDetail)
    complete = {
      orderDetails : orderDetail,
      ...response,
      ...response1,
      userId : this.aboutUser._id,
      type : "bloodTest"
    }
    console.log("complete", complete)

    setTimeout(() => {
      this.generatePDf(complete)
    });
  }
}