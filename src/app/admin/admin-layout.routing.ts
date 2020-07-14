import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { LabsComponent } from "./labs/labs.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PackagesComponent } from "./packages/packages.component";
import { TestsComponent } from "./tests/tests.component";
import { TestProfilesComponent } from "./test-profiles/test-profiles.component";
import { CorporateEntryComponent } from "./corporate-entry/corporate-entry.component";
import { LocationsComponent } from "./locations/locations.component";
import { WellnessServicesComponent } from "./wellness-services/wellness-services.component";
import { ProductsInventryComponent } from "./products-inventry/products-inventry.component";
import { EquipmentInventryComponent } from "./equipment-inventry/equipment-inventry.component";
import { EquipmentPurchaseComponent } from "./equipment-purchase/equipment-purchase.component";
import { MedecinesPurchaseComponent } from "./medecines-purchase/medecines-purchase.component";
import { MedecinesInventryComponent } from "./medecines-inventry/medecines-inventry.component";
import { FeedbacksComponent } from "./feedbacks/feedbacks.component";
import { EmployeesTempComponent } from "./employees-temp/employees-temp.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", component: DashboardComponent },
  {
    path: "user-profile",
    component: UserProfileComponent,
  },
  { path: "hospitals", component: HospitalsComponent },
  { path: "labs", component: LabsComponent },
  { path: "doctors", component: DoctorsComponent },
  { path: "corporates", component: CorporateEntryComponent },
  { path: "packages", component: PackagesComponent },
  { path: "tests", component: TestsComponent },
  {
    path: "test-profiles",
    component: TestProfilesComponent,
  },
  { path: "locations", component: LocationsComponent },
  { path: "products-inventry", component: ProductsInventryComponent },
  { path: "wellness-services", component: WellnessServicesComponent },
  { path: "medecines-inventry", component: MedecinesInventryComponent },
  { path: "medecines-purchase", component: MedecinesPurchaseComponent },
  { path: "equipment-inventry", component: EquipmentInventryComponent },
  { path: "equipment--purchase", component: EquipmentPurchaseComponent },
  { path: "feedbacks", component: FeedbacksComponent },
  { path: "employees-temp", component: EmployeesTempComponent },
];
