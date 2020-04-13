import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"]
})
export class CompanyComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
    $("#preloader")
      .delay(350)
      .fadeOut("slow"); // will fade out the white DIV that covers the website.

    // Sticky nav + scroll to top
    var $headerStick = $(".header_sticky");
    var $toTop = $("#toTop");
    $(window).on("scroll", function() {
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
    $toTop.on("click", function() {
      $("body,html").animate(
        {
          scrollTop: 0
        },
        500
      );
    });

    // Menu
    $("a.open_close").on("click", function() {
      $(".main-menu").toggleClass("show");
      $(".layer").toggleClass("layer-is-visible");
      $("header.static").toggleClass("header_sticky sticky");
      $("body").toggleClass("body_freeze");
    });
    $("a.show-submenu").on("click", function() {
      $(this)
        .next()
        .toggleClass("show_normal");
    });

    // Hamburger icon
    var toggles = document.querySelectorAll(".cmn-toggle-switch");
    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    }
    function toggleHandler(toggle) {
      toggle.addEventListener("click", function(e) {
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
}
