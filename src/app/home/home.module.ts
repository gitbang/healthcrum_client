import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomepageComponent } from "./components/homepage.component";
import { HomePageRoutes } from "./home.routing";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatDividerModule} from '@angular/material/divider';
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
  MatChipsModule,
  MatDialogModule,
  MatAutocompleteModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
} from "@angular/material";
import {AngularFittextModule} from 'angular-fittext';

import { LandingpageComponent } from "./pages/landingpage/landingpage.component";
import { UserloginComponent } from "./pages/userlogin/userlogin.component";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  SignupComponent,
  DialogContentExampleDialog,
} from "./pages/signup/signup.component";
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
import { AfterSocialSignupComponent } from "./pages/after-social-signup/after-social-signup.component";
import { AfterLocalSignupComponent } from "./pages/after-local-signup/after-local-signup.component";
import { BookTestComponent } from "./pages/blood-test/book-test/book-test.component";
import { ViewDetailsComponent } from "./pages/blood-test/view-details/view-details.component";
import { HomeServiceService } from "./home-service.service";
import { AddMemberComponent } from "./pages/blood-test/add-member/add-member.component";
import { ViewDoctorDetailsComponent } from "./pages/consultation/view-doctor-details/view-doctor-details.component";
import { MiddleWareComponent } from './pages/middle-ware/middle-ware.component';
import { BookModelComponent } from './pages/consultation/book-model/book-model.component';
import { CheckOutComponent } from './pages/consultation/check-out/check-out.component';
import { ERecieptComponent } from './pages/consultation/e-reciept/e-reciept.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { LandingPageComponent } from './pages/wellness/landing-page/landing-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UploadPrescriptionComponent } from './pages/medicines/upload-prescription/upload-prescription.component';
import {MatSliderModule} from '@angular/material/slider';
import { SocialDetailsComponent } from './pages/signup/social-details/social-details.component';
import { FlipModule } from 'ngx-flip';

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
    ContactUsComponent,
    DialogContentExampleDialog,
    BookTestComponent,
    ViewDetailsComponent,
    AddMemberComponent,
    ViewDoctorDetailsComponent,
    MiddleWareComponent,
    BookModelComponent,
    CheckOutComponent,
    ERecieptComponent,
    LandingPageComponent,
    NotFoundComponent,
    UploadPrescriptionComponent,
    SocialDetailsComponent,
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
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    MatTabsModule,
    AngularFittextModule,
    MatSliderModule,
    FlipModule
  ],
  entryComponents: [
    DialogContentExampleDialog,
    ViewDetailsComponent,
    AddMemberComponent,
    BookModelComponent,
    UploadPrescriptionComponent,
    ERecieptComponent,
    SocialDetailsComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
    HomeServiceService,
  ],
})
export class HomeModule {}
