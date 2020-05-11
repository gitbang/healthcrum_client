import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { CheckboxControlValueAccessor } from "@angular/forms";


export interface events{
  id : number,
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
  id : number,
  name : string,
  postedby : string,
  show : string,
  action : string
}

const event1 : events[] = [
  {id : 1, name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {id : 2, name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {id : 3, name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {id : 4, name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {id : 5, name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' },
  {id : 6, name : "first", start : '10/12/20', location : 'delhi', slots : 2, lastbookingDate : '1/12/20', price: 1000, details :'', cancel :'' }
]

const article1 : articles[] = [
  {id : 1, name :"myname", postedby : "me", show :'', action :''},
  {id : 2, name :"myname", postedby : "me", show :'', action :''},
  {id : 3, name :"myname", postedby : "me", show :'', action :''},
  {id : 4, name :"myname", postedby : "me", show :'', action :''},
  {id : 5, name :"myname", postedby : "me", show :'', action :''}
]

@Component({
  selector: "app-events-article",
  templateUrl: "./events-article.component.html",
  styleUrls: ["./events-article.component.scss"]
})
export class EventsArticleComponent implements OnInit {

  constructor(
    private dialog : MatDialog, 
    private _snackbar : MatSnackBar,
  ) {}

  colsevent : string[]= ['id', 'name', 'start', 'location', 'slots', 'lastbookingDate', 'price', 'details', 'cancel'];
  colsarticle : string[]= ['id', 'name', 'postedby', 'show', 'action'];

  article = new MatTableDataSource(article1)
  event = new MatTableDataSource (event1)
  ngOnInit() {}
  deleteEvent(j : number) {
    console.log(j)
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
        this.deleteRow(this.event, j);
        Swal.fire("Deleted!", "Event has been deleted.", "success");
      }
    });
  }

  deleteArticle(j : number) {
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
        this.deleteRow(this.article, j);
        Swal.fire("Deleted!", "Article has been deleted.", "success");
      }
    });
  }

  deleteRow (array  , index) {
    array.data.splice(index , 1);
    array._updateChangeSubscription()
  }
}
