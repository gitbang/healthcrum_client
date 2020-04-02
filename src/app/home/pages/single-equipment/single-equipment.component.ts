import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-single-equipment",
  templateUrl: "./single-equipment.component.html",
  styleUrls: ["./single-equipment.component.scss"]
})
export class SingleEquipmentComponent implements OnInit {
  type: string;
  constructor(private route: ActivatedRoute) {
    this.type = this.route.snapshot.paramMap.get("id");
  }
  ngOnInit() {}
}
