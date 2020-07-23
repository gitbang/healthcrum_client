import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: "app-single-medicine",
  templateUrl: "./single-medicine.component.html",
  styleUrls: ["./single-medicine.component.scss"],
})
export class SingleMedicineComponent implements OnInit {
  type: number;
  constructor(
    private route: ActivatedRoute,
    private router : Router) {
    this.type = parseInt(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit() {
    //     var demoTrigger = document.querySelector('.demo-trigger');
    // var paneContainer = document.querySelector('.detail');
    // new Drift(demoTrigger, {
    //   paneContainer: paneContainer,
    //   inlinePane: false,
    // });
  }

  affilication =[
    {
      src : "../../../../assets/img/Equipments/amazon2.png",
      price : 180,
      link : "https://www.amazon.com"
    },
    {
      src : "../../../../assets/img/Equipments/amazon2.png",
      price : 170,
      link : "https://www.amazon.com"
    },
    {
      src : "../../../../assets/img/Equipments/amazon2.png",
      price : 200,
      link : "https://www.amazon.com"
    },
    {
      src : "../../../../assets/img/Equipments/amazon2.png",
      price : 220,
      link : "https://www.amazon.com"
    },
    {
      src : "../../../../assets/img/Equipments/amazon2.png",
      price : 180,
      link : "https://www.amazon.com"
    },
  ]
  goTOstore(index : number){
    window.location.href = this.affilication[index].link
  }
}
