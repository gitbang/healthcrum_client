import { Routes } from "@angular/router";
import { CompanyComponent } from "./company.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AppointmentComponent } from "./pages/appointment/appointment.component";
import { MedicalRecordComponent } from "./pages/medical-record/medical-record.component";
import { EventsArticleComponent } from "./pages/events-article/events-article.component";
import { EmployeeRegistrationComponent } from "./pages/employee-registration/employee-registration.component";
import { FeedbackComponent } from "./pages/feedback/feedback.component";
import { EmployeeTrackingComponent } from "./pages/employee-tracking/employee-tracking.component";
import { HealthAnalysisComponent } from "./pages/health-analysis/health-analysis.component";
import { HealthStatusComponent } from "./pages/health-status/health-status.component";
import { BookedAppointmentComponent } from "./pages/booked-appointment/booked-appointment.component";

export const CompanyRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "event-article", component: EventsArticleComponent },
  { path: "appointment", component: AppointmentComponent },
  { path: "booked-appointment", component: BookedAppointmentComponent },
  { path: "health-status", component: HealthStatusComponent },
  { path: "employment-report", component: MedicalRecordComponent },
  { path: "registration", component: EmployeeRegistrationComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "employee-tracking", component: EmployeeTrackingComponent },
  { path: "health-analysis", component: HealthAnalysisComponent },
  { path: "service", component: DashboardComponent },
];
