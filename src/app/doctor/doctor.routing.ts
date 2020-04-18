import { Routes } from "@angular/router";
import { DoctorComponent } from "./doctor.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MedicalRecordComponent } from "./pages/medical-record/medical-record.component";
import { PerscriptionComponent } from "./pages/perscription/perscription.component";
import { OdersComponent } from "./pages/oders/oders.component";
import { AppointmentComponent } from "./pages/appointment/appointment.component";
import { RecommendComponent } from "./pages/recommend/recommend.component";
import { ServiceComponent } from "./pages/service/service.component";
import { PatientCheckupComponent } from "./pages/patient-checkup/patient-checkup.component";
import { EPrescriptionComponent } from "./pages/e-prescription/e-prescription.component";

export const DoctorRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "appointments", component: AppointmentComponent },
  { path: "profile", component: DashboardComponent },
  { path: "report", component: MedicalRecordComponent },
  { path: "perscription", component: PerscriptionComponent },
  { path: "order", component: OdersComponent },
  { path: "recommend", component: RecommendComponent },
  { path: "patient-checkup", component: PatientCheckupComponent },
  { path: "service", component: ServiceComponent },
  { path: "e-prescription", component: EPrescriptionComponent },
];
