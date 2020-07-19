import { NgModule } from "@angular/core";
import { Route, Routes, RouterModule, UrlSegment } from "@angular/router";
import { AdminLayoutComponent } from "./admin/admin-layout.component";
import { HomepageComponent } from "./home/components/homepage.component";
import { PatientComponent } from "./patient/patient.component";
import { CompanyComponent } from "./company/company.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { PatientGuard } from "./services/patient.guard";
import { DoctorComponent } from "./doctor/doctor.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "",
    component: HomepageComponent,
    children: [
      {
        path: "",
        loadChildren: "./home/home.module#HomeModule"
      }
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    pathMatch: "prefix",
    children: [
      {
        path: "",
        loadChildren: "./admin/admin-layout.module#AdminLayoutModule",
        canLoad: ["canLoadAdminSection"]
      }
    ]
  },
  {
    path: "patient",
    component: PatientComponent,
    pathMatch: "prefix",
    children: [
      {
        path: "",
        loadChildren: "./patient/patient.module#PatientModule",
        canActivate: [PatientGuard]
      }
    ]
  },
  {
    path: "company",
    component: CompanyComponent,
    pathMatch: "prefix",
    children: [
      {
        path: "",
        loadChildren: "./company/company.module#CompanyModule"
      }
    ]
  },
  {
    path: "doctor",
    component: DoctorComponent,
    pathMatch: "prefix",
    children: [
      {
        path: "",
        loadChildren: "./doctor/doctor.module#DoctorModule"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "error",
    pathMatch: "full"
  },
  { path: "error", component: ErrorpageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
{
useHash: true,
    initialNavigation: 'enabled'
})
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: "canLoadAdminSection",
      useValue: (route: Route, segments: UrlSegment[]) => true
    },
    {
      provide: "canLoadPatientSection",
      useValue: (route: Route, segments: UrlSegment[]) => true
    }
  ]
})
export class AppRoutingModule {}
