import { Routes } from "@angular/router";
 import { DashboardComponent } from "./dashboard/dashboard.component";
 import { PatientApponitmentsComponent } from "./patient-apponitments/patient-apponitments.component";
// import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
// import { PatientTestsComponent } from "./patient-tests/patient-tests.component";
 import { PatientreportsComponent } from "./patientreports/patientreports.component";
// import { HealthStatusComponent } from "./health-status/health-status.component";
 import { PatientPerscriptionComponent } from "./patient-perscription/patient-perscription.component";
 import { PatientOrdersComponent } from "./patient-orders/patient-orders.component";
// import { PatientServicesComponent } from "./patient-services/patient-services.component";
// import { PatientFeedbackComponent } from "./patient-feedback/patient-feedback.component";
// import { HraStoryBoardComponent } from "./hra-story-board/hra-story-board.component";
// import { ViewDoctorComponent } from "./view-doctor/view-doctor.component";
 import { PatientEhrComponent } from "./patient-ehr/patient-ehr.component";
import { TemperatureEntryComponent } from "./temperature-entry/temperature-entry.component";
import { MaintainanceComponent } from './maintainance/maintainance.component';
export const PatientRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "appointment", component: PatientApponitmentsComponent },
  { path: "profile", component: MaintainanceComponent },
  { path: "tests", component: MaintainanceComponent },
  { path: "reports", component: PatientreportsComponent },
  { path: "ehr", component: PatientEhrComponent },
  { path: "orders", component: PatientOrdersComponent },
  { path: "feedback", component: MaintainanceComponent },
  { path: "eligible-service", component: MaintainanceComponent },
  { path: "persciptions", component: PatientPerscriptionComponent },
  { path: "health-status", component: MaintainanceComponent },
  { path: "hra-report-fill", component: MaintainanceComponent },
  { path: "view-doctor/:id", component: MaintainanceComponent },
  { path: "temperature-entry", component: TemperatureEntryComponent },
  { path: "", component: TemperatureEntryComponent },
];

