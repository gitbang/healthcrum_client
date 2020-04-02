import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-single-medicine",
  templateUrl: "./single-medicine.component.html",
  styleUrls: ["./single-medicine.component.scss"]
})
export class SingleMedicineComponent implements OnInit {
  type: string;
  constructor(private route: ActivatedRoute) {
    this.type = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    //     var demoTrigger = document.querySelector('.demo-trigger');
    // var paneContainer = document.querySelector('.detail');
    // new Drift(demoTrigger, {
    //   paneContainer: paneContainer,
    //   inlinePane: false,
    // });
  }
}
