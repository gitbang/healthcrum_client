import { Component, OnInit } from "@angular/core";
import PerfectScrollbar from "perfect-scrollbar";

@Component({
  selector: "app-wellness-services",
  templateUrl: "./wellness-services.component.html",
  styleUrls: ["./wellness-services.component.scss"],
})
export class WellnessServicesComponent implements OnInit {
  isAnySelected: boolean = false;
  wellnessSelected: boolean = false;
  yogaSelected = false;
  gymSelected = false;
  spaSelected = false;
  zumbaSelected = false;
  webinarSelected = false;
  ditecianSelected = false;

  // ps = new PerfectScrollbar("#container");
  constructor() {}

  ngOnInit() {}

  openWellness() {
    this.toggleSelected();
    this.isAnySelected = true;
    this.wellnessSelected = true;
  }
  openYoga() {
    this.toggleSelected();
    this.isAnySelected = true;
    this.yogaSelected = true;
  }
  openGym() {
    this.toggleSelected();
    this.isAnySelected = true;
    this.gymSelected = true;
  }
  openSpa() {
    this.toggleSelected();
    this.isAnySelected = true;
    this.spaSelected = true;
  }
  openZumba() {
    this.toggleSelected();
    this.isAnySelected = true;
    this.zumbaSelected = true;
  }
  openWebinar() {
    this.toggleSelected();
    this.isAnySelected = true;
    this.webinarSelected = true;
  }
  openDitecian() {
    this.toggleSelected();
    this.isAnySelected = true;
    this.ditecianSelected = true;
  }

  toggleSelected() {
    this.webinarSelected = false;
    this.wellnessSelected = false;
    this.yogaSelected = false;
    this.gymSelected = false;
    this.ditecianSelected = false;
    this.zumbaSelected = false;
    this.spaSelected = false;
    this.scrollToTop();
  }

  scrollToTop() {
    const container = document.querySelector("#container");
    // container.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  goBack() {
    this.toggleSelected();
    this.isAnySelected = false;
  }
}
