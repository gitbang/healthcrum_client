import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-equipments",
  templateUrl: "./equipments.component.html",
  styleUrls: ["./equipments.component.scss"]
})
export class EquipmentsComponent implements OnInit {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  i: number = 0;
  isNext: boolean = true;
  categoryList = [
    "surgical and medical instruments",
    "surgical appliance and supplies",
    "dental equipment and supplies",
    "X-ray equipment",
    "electromedical equipment"
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  goToMedecine(type) {
    this.router.navigate(["/equipment", type]);
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
