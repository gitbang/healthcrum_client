import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landingpage",
  templateUrl: "./landingpage.component.html",
  styleUrls: ["./landingpage.component.scss"]
})
export class LandingpageComponent implements OnInit {
  slides = [
    { img: "../../../../assets/img/partners/p1-omron.png" },
    { img: "../../../../assets/img/partners/p2-max.png" },
    { img: "../../../../assets/img/partners/p3-apollo-clinics.png" },
    { img: "../../../../assets/img/partners/p4-rsz_drlalpath_labs.png" },
    { img: "../../../../assets/img/partners/p5-Srl_Diagnostics.jpg.png" },
    { img: "../../../../assets/img/partners/p7-rsz_modern-diagnostic.png" },
    { img: "../../../../assets/img/partners/p8-dots.png" }
  ];
  constructor() {}
  slideConfig = { slidesToShow: 6, slidesToScroll: 1, autoplay: true };
  ngOnInit() {
    $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
    $("#preloader")
      .delay(350)
      .fadeOut("slow"); // will fade out the white DIV that covers the website.

    var $hero = $(".hero_home .content");
    var $hero_v = $("#hero_video .content ");
    $hero.find("h3, p, form").addClass("fadeInUp animated");
    $hero.find(".btn_1").addClass("fadeIn animated");
    $hero_v.find(".h3, p, form").addClass("fadeInUp animated");
    $(window).scroll();
    // $(".customer-logos").slick({
    //   slidesToShow: 6,
    //   slidesToScroll: 1,
    //   autoplay: true,
    //   autoplaySpeed: 1000,
    //   arrows: false,
    //   dots: false,
    //   pauseOnHover: false,
    //   responsive: [
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 4
    //       }
    //     },
    //     {
    //       breakpoint: 520,
    //       settings: {
    //         slidesToShow: 3
    //       }
    //     }
    //   ]
    // });
  }
  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" });
  }
}
