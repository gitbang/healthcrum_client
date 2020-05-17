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
      setTimeout(() => (this.event.paginator = this.paginator));
    });
  }
  articlesFromBackend: any;
  getarticles() {
    this.service.getallArticles().subscribe((result) => {
      this.article = new MatTableDataSource(result.data);
      this.article.paginator = this.tableTwoPaginator;
    });
  }

  addEvent() {
    const dialog = this.dialog.open(AddEventArticleComponent, {
      data: "event",
    });
    dialog.afterClosed().subscribe((response) => {
      if (response.result) {
        this.getevents();
      }
    });
  }
  addArticle() {
    const dialog = this.dialog.open(AddEventArticleComponent, {
      data: "article",
    });
    dialog.afterClosed().subscribe((response) => {
      this.getarticles();
    });
  }

  deleteEvent(j: number) {
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

  updateEvent(i: number) {}

  updateArticle(i: number) {}
}
