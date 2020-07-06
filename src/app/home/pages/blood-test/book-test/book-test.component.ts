import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HomeServiceService} from '../../../home-service.service'
import {MatDialog, MAT_DIALOG_DATA, MatChipInputEvent} from '@angular/material'
import { AddMemberComponent } from '../add-member/add-member.component';
import {FormBuilder, FormArray, FormGroup, FormControl} from '@angular/forms'
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Member {
  name: string;
}

@Component({
  selector: 'app-book-test',
  templateUrl: './book-test.component.html',
  styleUrls: ['./book-test.component.scss']
})
export class BookTestComponent implements OnInit {

  //userId : string = "1234";
  userId : string = "5e8efa895b324a3e4c97a278";
  constructor(
    private router : Router,
    private service : HomeServiceService,
    private dialog : MatDialog,
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private route: ActivatedRoute,
  ) {
    
    
   // this.getUsercart();
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
      //console.log(this.shownresultarrays)
      //console.log(this.shownresultarrays)
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

    this.isLogin= this.service.checkLogin();

    this.getrelatives();

    this.route.url.subscribe((result)=>{
      if(this.isLogin){

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
        // this.addGrop(this.userCompleteCart.length);

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
    }
    this.calculateprice(i);
  }

  selected(event: MatAutocompleteSelectedEvent, index : number): void {

    this.memberInput.nativeElement.value = '';
    this.memberCtrl.setValue(null);
    
    console.log("event is : ", event)
    
    if(!this.testfor.value[index].otherlist.includes(event.option.viewValue)) {
      this.testfor.value[index].otherlist.push(event.option.viewValue);      
      this.allID.others.push(this.relativeData.members[index]._id)
    }

   // console.log("total members selected",this.testfor.value[index].otherlist.length)
    this.calculateprice(index);
  }

  _filter(value: string): string[] {
   // console.log(value)
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

  myId : string = "5e8efa895b324a3e4c97a278";

  shownresultarrays =[
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", 
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
      alert ("Login irst")
    }
  }

  placeorder(){
    //console.log("next portal")
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
    //console.log("indec in test-for-members",index)
    this.testfor.value[index].others = value;
    if(value == false) {
      //this.members = [];
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
    //console.log(this.pricearray.value)
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
    // console.log("price array values",this.pricearray.value)
  }

  allID = {
    me : this.myId,
    others : []
  }
  finalPrice : number = 0;
}

