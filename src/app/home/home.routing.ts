import { Routes } from "@angular/router";
import { LandingpageComponent } from "./pages/landingpage/landingpage.component";
import { UserloginComponent } from "./pages/userlogin/userlogin.component";
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
import { BookTestComponent } from "./pages/blood-test/book-test/book-test.component";
import { ViewDetailsComponent } from "./pages/blood-test/view-details/view-details.component";
import { ViewDoctorDetailsComponent } from "./pages/consultation/view-doctor-details/view-doctor-details.component";

export const HomePageRoutes: Routes = [
  { path: "home", component: LandingpageComponent },
  { path: "login", component: UserloginComponent },
  { path: "signup", component: SignupComponent },
  { path: "blood-test", component: BloodTestComponent },
  { path: "labs", component: LabsComponent },
  { path: "doctors", component: DoctorsComponent },
  { path: "consultation", component: ConsultationComponent },
  { path: "medecines", component: MedicinesComponent },
  { path: "medecine/:id", component: SingleMedicineComponent },
  { path: "equipments", component: EquipmentsComponent },
  { path: "equipment/:id", component: SingleEquipmentComponent },
  { path: "aboutus", component: AboutUsComponent },
  { path: "contactus", component: ContactUsComponent },
  { path: "view-doctor/:id", component: DoctorComponent },
  {path: "blood-test/viewdetails/:id", component: ViewDetailsComponent},
  {path: "blood-test/:hrId", component : BookTestComponent},
  {path : "consultation/view-doctor-details/:id", component: ViewDoctorDetailsComponent}
];
