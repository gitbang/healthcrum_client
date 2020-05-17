import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-c-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getTitle(): String {
    return "Corporate Dashboard";
  }
}
