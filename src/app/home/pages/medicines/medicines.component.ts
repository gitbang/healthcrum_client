import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-medicines",
  templateUrl: "./medicines.component.html",
  styleUrls: ["./medicines.component.scss"],
})
export class MedicinesComponent implements OnInit {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  i: number = 0;
  isNext: boolean = true;
  tablets: boolean = false;
  capsules: boolean = false;
  syrups: boolean = false;
  others: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}
  goNext() {}
  goToMedecine(type) {
    this.router.navigate(["/medecine", type]);
  }

  showNext() {
    this.items = [];
    this.isNext = true;
    this.i++;
    setTimeout(() => {
      for (let i = 1; i <= 12; i++) {
        this.items.push(Math.floor(Math.random() * 100));
      }
    }, 100);

    window.scrollTo(0, 0);
  }

  showPrev() {
    this.items = [];
    setTimeout(() => {
      if (this.i > 1) {
        this.i--;
        for (let i = 1; i <= 12; i++) {
          this.items.push(Math.floor(Math.random() * 100));
        }
      } else {
        this.isNext = false;
        this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      }
    }, 100);

    window.scrollTo(0, 0);
  }
}
