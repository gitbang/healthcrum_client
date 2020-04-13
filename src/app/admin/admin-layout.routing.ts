import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { LabsComponent } from "./labs/labs.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PackagesComponent } from "./packages/packages.component";
import { TestsComponent } from "./tests/tests.component";
import { TestProfilesComponent } from "./test-profiles/test-profiles.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", component: DashboardComponent },
  {
    path: "user-profile",
    component: UserProfileComponent
  },
  { path: "hospitals", component: HospitalsComponent },
  { path: "labs", component: LabsComponent },
  { path: "doctors", component: DoctorsComponent },
  { path: "packages", component: PackagesComponent },
  { path: "tests", component: TestsComponent },
  {
    path: "test-profiles",
    component: TestProfilesComponent
  }
];
