import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-middle-ware',
  templateUrl: './middle-ware.component.html',
  styleUrls: ['./middle-ware.component.scss']
})
export class MiddleWareComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }
  data = [
    {name : "Allopathy", totalDoctors : 50, onlineDoctors : 30, img : "./assets/img/consulation/middle-ware/allopathy.jpg"},
    {name : "Homeopathy", totalDoctors : 50, onlineDoctors : 30, img : "./assets/img/consulation/middle-ware/homeopathy.jpg"},
    {name : "Ayurvedic  ", totalDoctors : 50, onlineDoctors : 30, img : "./assets/img/consulation/middle-ware/ayurvedic.jpg"},
  ]

  typeSelected(name : string) {
    this.router.navigateByUrl('/consultation/'+ name)
  }

}
