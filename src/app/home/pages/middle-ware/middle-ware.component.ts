import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-middle-ware',
  templateUrl: './middle-ware.component.html',
  styleUrls: ['./middle-ware.component.scss']
})
export class MiddleWareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  data = [
    {name : "Allopathy", totalDoctors : 50, onlineDoctors : 30, img : "./assets/img/consulation/middle-ware/allopathy.jpg"},
    {name : "Homeopathy", totalDoctors : 50, onlineDoctors : 30, img : "./assets/img/consulation/middle-ware/homeopathy.jpg"},
    {name : "Ayurvedic  ", totalDoctors : 50, onlineDoctors : 30, img : "./assets/img/consulation/middle-ware/ayurvedic.jpg"},
  ]
}
