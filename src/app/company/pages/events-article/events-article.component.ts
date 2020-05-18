import { Component, OnInit, ViewChild } from "@angular/core";
import Swal from "sweetalert2";
import {
  MatDialog,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
} from "@angular/material";
import { CheckboxControlValueAccessor } from "@angular/forms";
import { AddEventArticleComponent } from "./add-event-article/add-event-article.component";
import { CompanyService } from "app/company/company.service";
import { Observable } from "rxjs";
//import { FileService } from '../file.service';

export interface events {
  _id: string;
  name: string;
  start: string;
  location: string;
  slots: number;
  lastbookingDate: string;
  price: number;
  details: string;
  cancel: string;
}

export interface articles {
  _id: string;
  name: string;
  postedby: string;
  action: string;
}

const event1: events[] = [];

const article1: articles[] = [];

@Component({
  selector: "app-events-article",
  templateUrl: "./events-article.component.html",
  styleUrls: ["./events-article.component.scss"],
})
export class EventsArticleComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("secondPaginator", { static: true }) paginatortwo: MatPaginator;
  @ViewChild("TableTwoPaginator", { static: true })
  tableTwoPaginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private service: CompanyService
  ) {}

  colsarticle: string[] = [
    "id",
    "title",
    "postedBy",
    "postedOn",
    "edit",
    "action",
  ];

  colsevent: string[] = [
    "id",
    "title",
    "startDate",
    "location",
    "slots",
    "lastBookingDate",
    "price",
    "description",
    "edit",
    "cancel",
  ];

  article = new MatTableDataSource(article1);
  event = new MatTableDataSource(event1);

  ngOnInit() {
    this.getevents();
    this.getarticles();
  }
  eventFromBackend: any;
  getevents() {
    this.service.getallEvents().subscribe((result) => {
      this.eventFromBackend = result;
      this.event = new MatTableDataSource(result.data);
      console.log("events : ", this.event);
      setTimeout(() => (this.event.paginator = this.paginator));
    });
  }
  articlesFromBackend: any;
  getarticles() {
    this.service.getallArticles().subscribe((result) => {
      console.log("articles ", result);
      this.article = new MatTableDataSource(result.data);
      console.log("articles :", this.article.data);
      this.article.paginator = this.tableTwoPaginator;
    });
  }
  addEvent() {
    console.log("add event reached");
    const dialog = this.dialog.open(AddEventArticleComponent, {
      data: {
        category: "event",
      },
    });
    dialog.afterClosed().subscribe((response) => {
      console.log(response);
      if (response.result) {
        this.getevents();
        this._snackbar.open("Event", "Saved", {
          duration: 3000,
        });
      }
    });
  }
  addArticle() {
    const dialog = this.dialog.open(AddEventArticleComponent, {
      data: {
        category: "article",
      },
    });
    dialog.afterClosed().subscribe((response) => {
      console.log(response);
      if (response.result) {
        this._snackbar.open("Article", "Saved", {
          duration: 3000,
        });
      }
      this.getarticles();
    });
  }
  updateEvent(i) {
    console.log(i);
    console.log(this.event.data);
    const eve = this.dialog.open(AddEventArticleComponent, {
      data: {
        category: "event",
        type: "update",
        values: this.event.data[i],
      },
    });
    eve.afterClosed().subscribe((response) => {
      if (response.result) {
        this._snackbar.open("Event", "Saved", {
          duration: 3000,
        });
      }
    });
  }
  updateArticle(i) {
    const eve = this.dialog.open(AddEventArticleComponent, {
      data: {
        category: "article",
        type: "update",
        values: this.article.data[i],
      },
    });
    eve.afterClosed().subscribe((response) => {
      if (response.result) {
        this._snackbar.open("article", "Saved", {
          duration: 3000,
        });
      }
    });
  }
  deleteEvent(j: number) {
    var _this = this;
    console.log(this.event.data);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        // add service which send http request to delete the event at this location .
        let id = this.event.data[j]._id;
        //this.deleteRow(this.event, j);
        this.service.eventdelete(id).subscribe((result) => {
          Swal.fire("Deleted!", "Event has been deleted.", "success");
        });
        _this.getevents();
      }
    });
  }
  deleteArticle(j: number) {
    var _this = this;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        let id = this.article.data[j]._id;
        this.service.articledelete(id).subscribe((result) => {
          console.log(result);
        });
        //this.deleteRow(this.article, j);
        Swal.fire("Deleted!", "Article has been deleted.", "success");
        this.getarticles();
      }
    });
  }
  deleteRow(array, index) {
    array.data.splice(index, 1);
    array._updateChangeSubscription();
  }

  applyFilterArticles(filterValue: string) {
    this.article.filter = filterValue.trim().toLowerCase();
  }

  applyFilterevents(filterValue: string) {
    this.event.filter = filterValue.trim().toLowerCase();
  }
}
