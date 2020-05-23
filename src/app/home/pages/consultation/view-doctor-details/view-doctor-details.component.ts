import { Component, OnInit } from '@angular/core';
import { HomeServiceService} from '../.././../home-service.service'

@Component({
  selector: 'app-view-doctor-details',
  templateUrl: './view-doctor-details.component.html',
  styleUrls: ['./view-doctor-details.component.scss']
})
export class ViewDoctorDetailsComponent implements OnInit {

  constructor(
    private service : HomeServiceService
  ) { }

  ngOnInit() {
    this.service.currendoctor.subscribe((result)=>{
      //this.doctor = result
      console.log(this.doctor)
    })
  }
//  doctor : object
  doctor = {_id : "1", image : './assets/img/faces/doctor.png', name : 'DR. PANKAJ MANORIA', experience : '10+ years',
   speciality : 'Heart', fee : 5000, rating : 5, timing : '10am - 6pm', 
   emergency : 'yes', degree : 'MD', physicalConsultant : '10am - 6pm'}
}

