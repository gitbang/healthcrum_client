import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {HomeServiceService} from '../../../home-service.service'
import {MatDialog, MAT_DIALOG_DATA, MatChipInputEvent} from '@angular/material'
import { AddMemberComponent } from '../add-member/add-member.component';
import {FormBuilder, FormArray, FormGroup, FormControl} from '@angular/forms'
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import Swal from 'sweetalert2'

export interface Member {
  name: string;
}

@Component({
  selector: 'app-book-test',
  templateUrl: './book-test.component.html',
  styleUrls: ['./book-test.component.scss']
})
export class BookTestComponent implements OnInit {

  constructor(
    private router : Router,
    private service : HomeServiceService,
    private dialog : MatDialog,
    private fb : FormBuilder
  ) {
    this.service.currentCart.subscribe((result)=>{
      console.log(result)
      this.usercart = result
      console.log("usercart : ", this.usercart)
    })

    /*
    this.filteredMembers = this.memberCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allMembers.slice()));
        */
      
    this.filteredMembers = this.memberCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
   }

   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.members.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.memberCtrl.setValue(null);
  }

  remove(member: string, i: number): void {
    console.log(member)
    const index = this.testfor.value[i].otherlist.indexOf(member);
    if (index >= 0) {
      this.testfor.value[i].otherlist.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, index : number): void {
    console.log("index is : ", index)
    this.members.push(event.option.viewValue);
    this.memberInput.nativeElement.value = '';
    this.memberCtrl.setValue(null);
   // console.log(this.testfor.value);
    this.testfor.value[index].otherlist = this.members
    this.members = []
   // (<FormGroup>this.testfor[index]).get('otherlist').setValue(this.members)
    console.log("test for array ",this.testfor.value)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.allMembers)
    return this.allMembers.filter(member => member.toLowerCase().includes(filterValue));
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
  usercart 
  ngOnInit() {

   
    if(this.userlogin == false) {
     // this.router.navigateByUrl('/signup')
    }
    this.shownresultarrays.forEach(i=>{
      this.addgroup();
    }) 
  }


  shownresultarrays =[
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
    { name : "Blood Test", includes : "Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)", reportIn : "24 hrs", totaltest : 12, marketprize : 4200, healcrumPrize : 2500, offerprize : 2000},
  ]

  placeorderClass : string = ""
  
  testfor = this.fb.array([
  ])

  addgroup (){
    this.testfor.push(this.fb.group({
      me : [false],
      others : [false],
      otherlist : []
    }))
  }
  
  changeStyle(event) {
    this.placeorderClass = event.type == 'mouseover' ? 'btn-success' : '';
  }

  addmore(){
    this.router.navigateByUrl('blood-test')
  }

  placeorder(){
    console.log("next portal")
  }

  deletefromCart(index : number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(result)
      console.log(index)
      console.log(this.usercart)
      this.usercart.slice(index, 1)
      console.log(this.usercart)
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your packge has been deleted.',
          'success'
        )
      }
    })
    
  }

  userId : string = "123456";
  addMember(){
    this.dialog.open(AddMemberComponent, {
      data : this.userId
    })
  }

  testForMe(value, index) {
    console.log(index)
   this.testfor.value[index].me = value;
    console.log(this.testfor.value)
  }

  testForMember(value, index) {
    this.testfor.value[index].others = value;
    console.log( this.testfor)
    
  }

  
}
