import { Component, OnInit } from "@angular/core";
import {
  faBezierCurve,
  faHospital,
  faFlask,
  faUserMd,
  faBoxOpen,
  faVials,
  faStethoscope,
  faFirstAid,
  faMedkit,
  faPills,
  faCrutch,
  faShoppingCart,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
declare const $: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  faBezierCurve = faBezierCurve;
  faHospital = faHospital;
  faBuilding = faBuilding;
  faFlask = faFlask;
  faUserMd = faUserMd;
  faBoxOpen = faBoxOpen;
  faVials = faVials;
  profiles = faStethoscope;
  parameter = faFirstAid;
  package = faMedkit;
  medecines = faPills;
  crutch = faCrutch;
  cart = faShoppingCart;

  constructor(private router: Router) {}

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  
  signOutUser() {
    this.router.navigate(["/login"]);
  }
}
