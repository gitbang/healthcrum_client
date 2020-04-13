import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomepageComponent } from "./components/homepage.component";
import { HomePageRoutes } from "./home.routing";
import { SlickCarouselModule } from "ngx-slick-carousel";
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatBadgeModule,
  MatCommonModule,
  MatNativeDateModule,
  MatRadioModule,
  MatStepperModule,
  MatTableModule,
  MatCheckboxModule,
  MatIconModule,
  MatChipsModule
} from "@angular/material";
import { LandingpageComponent } from "./pages/landingpage/landingpage.component";
import { UserloginComponent } from "./pages/userlogin/userlogin.component";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SignupComponent } from "./pages/signup/signup.component";
import { BloodTestComponent } from "./pages/blood-test/blood-test.component";
import { LabsComponent } from "./pages/labs/labs.component";
import { DoctorsComponent } from "./pages/doctors/doctors.component";
import { DoctorComponent } from "./pages/doctor/doctor.component";
import { ConsultationComponent } from "./pages/consultation/consultation.component";
import { MedicinesComponent } from "./pages/medicines/medicines.component";
import { SingleMedicineComponent } from "./pages/single-medicine/single-medicine.component";
import { EquipmentsComponent } from "./pages/equipments/equipments.component";
import { SingleEquipmentComponent } from "./pages/single-equipment/single-equipment.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";

@NgModule({
  declarations: [
    HomepageComponent,
    LandingpageComponent,
    UserloginComponent,
    SignupComponent,
    BloodTestComponent,
    LabsComponent,
    DoctorsComponent,
    DoctorComponent,
    ConsultationComponent,
    MedicinesComponent,
    SingleMedicineComponent,
    EquipmentsComponent,
    SingleEquipmentComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomePageRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatCommonModule,
    MatNativeDateModule,
    MatRadioModule,
    MatStepperModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    SlickCarouselModule,
    FontAwesomeModule,
    HttpClientModule
  ]
})
export class HomeModule {}
