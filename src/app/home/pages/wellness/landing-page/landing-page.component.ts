import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  data = [
    {name : "Webinar", img : "./assets/img/wellness/webinar.jpg"},
    {name : "Spa", img : "./assets/img/wellness/spa.jpg"},
    {name : "Gym", img : "./assets/img/wellness/gym.jpg"},
    {name : "Zumba", img : "./assets/img/wellness/zumba.jpg"},
    {name : "Yoga", img : "./assets/img/wellness/yoga.jpg"},
    {name : "Weight Loss",img : "./assets/img/wellness/weightloss.jpg"},
    {name : "Ayurvega Panchakarma",img : "./assets/img/wellness/panchkarma.jpg"},
  ]

  typeSelected(name : string) {
    //this.router.navigateByUrl('/consultation/'+ name.toLowerCase())
  }

}
