import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { AuthService, SocialUser } from "angularx-social-login";
import { AuthServiceLocal } from "../../services/auth-service.service";
import {
  faFacebook,
  faGooglePlusG,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  loggedIn: boolean;
  user: SocialUser;
  google = faGooglePlusG;
  twitter = faTwitter;
  youtube = faYoutube;
  insta = faInstagram;
  fb = faFacebook;
  role:number = 0;
  constructor(
    private authService: AuthService,
    private authLocal: AuthServiceLocal
  ) {
    this.authService.authState.subscribe((user) => {
      if (!user) {
        this.loggedIn = this.authLocal.isLoggedIn();
        this.user = new SocialUser();
        console.log(this.loggedIn);
        if (this.loggedIn) {
          try{
            let userData = this.authLocal.getUserDetails();
             this.user.name = userData.name;
             this.user.photoUrl = "/assets/img/avatar.png";
             this.user.id = userData.healthcrumId;
             if(userData.role == "hr"){
               this.role = 2;
             }else if(userData.role == "employee" || userData.role == "patient"){
               this.role = 1;
             }else if(userData.role =="admin"){
               this.role = 4;
             }
          }catch(err){
            this.loggedIn = false;
          }
        } else {
          this.loggedIn = false;
        }
      } else {
        this.user = user;
        this.loggedIn = user != null;
      }
    });
  }

  ngOnInit() {
    $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.

    // Sticky nav + scroll to top
    var $headerStick = $(".header_sticky");
    var $toTop = $("#toTop");
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 1) {
        $headerStick.addClass("sticky");
      } else {
        $headerStick.removeClass("sticky");
      }
      if ($(this).scrollTop() != 0) {
        $toTop.fadeIn();
      } else {
        $toTop.fadeOut();
      }
    });
    $toTop.on("click", function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        500
      );
    });

    // Menu
    $("a.open_close").on("click", function () {
      $(".main-menu").toggleClass("show");
      $(".layer").toggleClass("layer-is-visible");
      $("header.static").toggleClass("header_sticky sticky");
      $("body").toggleClass("body_freeze");
    });
    $("a.show-submenu").on("click", function () {
      $(this).next().toggleClass("show_normal");
    });

    // Hamburger icon
    var toggles = document.querySelectorAll(".cmn-toggle-switch");
    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    }
    function toggleHandler(toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.contains("active") === true
          ? this.classList.remove("active")
          : this.classList.add("active");
      });
    }

    var $hero = $(".hero_home .content");
    var $hero_v = $("#hero_video .content ");
    $hero.find("h3, p, form").addClass("fadeInUp animated");
    $hero.find(".btn_1").addClass("fadeIn animated");
    $hero_v.find(".h3, p, form").addClass("fadeInUp animated");
    $(window).scroll();
  }

  signOutUser() {
    this.authService
      .signOut()
      .then((res) => {
        this.authLocal.logoutUser();
        this.user = null;
        this.loggedIn = false;
      })
      .catch((err) => {
        this.authLocal.logoutUser();
        this.user = null;
        this.loggedIn = false;
      });
  }
}
