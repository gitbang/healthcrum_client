import { Component, OnInit, ViewChild } from "@angular/core";
import Swal from "sweetalert2";
import { MatDialog, MatSnackBar, MatTableDataSource , MatPaginator } from "@angular/material";
import { CheckboxControlValueAccessor } from "@angular/forms";
import {AddEventArticleComponent} from './add-event-article/add-event-article.component'
import { CompanyService } from "app/company/company.service";
import { Observable } from "rxjs";


export interface events{
  _id : string,
  name : string,
  start : string,
  location : string,
  slots : number,
  lastbookingDate : string,
  price : number,
  details : string,
  cancel : string
}

export interface articles {
  _id: string,
  name : string,
  postedby : string,
  show : string,
  action : string
}

const event1 : events[] = [
  {_id : "1", name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {_id : "2", name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {_id : "3", name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {_id : "4", name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {_id : "5", name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {_id : "6", name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' }
]

const article1 : articles[] = [
  {_id : "1", name :"myname", postedby : "me", show :'', action :''},
  {_id : "2", name :"myname", postedby : "me", show :'', action :''},
  {_id : "3", name :"myname", postedby : "me", show :'', action :''},
  {_id : "4", name :"myname", postedby : "me", show :'', action :''},
  {_id : "5", name :"myname", postedby : "me", show :'', action :''}
]

@Component({
  selector: "app-events-article",
  templateUrl: "./events-article.component.html",
  styleUrls: ["./events-article.component.scss"]
})
export class EventsArticleComponent implements OnInit {

  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator
  @ViewChild( 'secondPaginator', {static : true}) paginatortwo : MatPaginator
  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  constructor(
    private dialog : MatDialog, 
    private _snackbar : MatSnackBar,
    private service : CompanyService
  ) {}

  //colsevent : string[]= ['id', 'name', 'start', 'location', 'slots', 'lastbookingDate', 'price', 'details', 'cancel'];
  //colsarticle : string[]= ['id', 'name', 'postedby', 'show', 'action'];
  colsarticle : string[]= ['id', 'title', 'postedBy', 'show','postedOn' , 'action'];

  colsevent : string[]= ['id', 'title', 'startDate', 'location', 'slots', 'lastBookingDate', 'price', 'description', 'cancel'];
 
  article = new MatTableDataSource(article1)
  event  = new MatTableDataSource (event1)
  
  
  
  ngOnInit() {
    console.log("ngoninit")
    this.getevents();
    this.getarticles();
  }
  eventFromBackend : any;
  getevents() {
    this.service.getallEvents().subscribe((result)=>{
      console.log(result);
      this.eventFromBackend = result;
      this.event = new MatTableDataSource(result)
      console.log("events : ", this.event)
      setTimeout(() => this.event.paginator = this.paginator)
    })
  }
  articlesFromBackend : any;
  getarticles() {
    //console.log("articles")
    this.service.getallArticles().subscribe((result)=>{
      console.log("articles ",result);
     // this.articlesFromBackend = result;
      this.article = new MatTableDataSource(result)
      console.log("articles :", this.article)
     //setTimeout(() => this.article.paginatortwo = this.paginator)
     this.article.paginator = this.tableTwoPaginator;
    })
  }


  addEvent(){
    console.log("add event reached")
    const dialog = this.dialog.open(AddEventArticleComponent, {
      data : 'event'
    })
    dialog.afterClosed().subscribe((response)=>{
      console.log(response)
      if(response.result) {
        this.getevents();
      }
    })
  }
  addArticle() {
    console.log("add article")
    const dialog = this.dialog.open(AddEventArticleComponent, {
      data : 'article'
    })
    dialog.afterClosed().subscribe((response)=>{
      console.log(response);
      this.getarticles();
    })
  }


  deleteEvent(j : number) {
    var _this = this
    console.log(this.event.data)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        // add service which send http request to delete the event at this location .
        console.log(this.event.data[j])
        let id = this.event.data[j]._id;
        console.log(id)
        //this.deleteRow(this.event, j);
        this.service.eventdelete(id).subscribe((result)=>{
          Swal.fire("Deleted!", "Event has been deleted.", "success");
        })
        _this.getevents();
       
      }
    });
  }

  deleteArticle(j : number) {
    var  _this = this;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        console.log(this.article.data[j])
        let id = this.article.data[j]._id;
        console.log(id)

        this.service.articledelete(id).subscribe((result)=>{
          console.log(result)
        })
        //this.deleteRow(this.article, j);
        Swal.fire("Deleted!", "Article has been deleted.", "success");
        this.getarticles();
      }
    });
  }

  deleteRow (array  , index) {
    array.data.splice(index , 1);
    array._updateChangeSubscription()
  }

  applyFilterArticles(filterValue: string) {
    this.article.filter = filterValue.trim().toLowerCase();
  }

  applyFilterevents(filterValue: string) {
    this.event.filter = filterValue.trim().toLowerCase();
  }
}
