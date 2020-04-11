import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CompanyComponent } from "./company.component";
import { CompanyRoutes } from "./company.routing";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AppointmentComponent } from "./pages/appointment/appointment.component";
import { MedicalRecordComponent } from "./pages/medical-record/medical-record.component";
import { PerscriptionComponent } from "./pages/perscription/perscription.component";
import { OdersComponent } from "./pages/oders/oders.component";
import { RecommendComponent } from "./pages/recommend/recommend.component";
import { ServiceComponent } from "./pages/service/service.component";
import { EventsArticleComponent } from "./pages/events-article/events-article.component";
import { EmployeeCheckupComponent } from "./pages/employee-checkup/employee-checkup.component";
import { EmployeeRegistrationComponent } from "./pages/employee-registration/employee-registration.component";
import { FeedbackComponent } from "./pages/feedback/feedback.component";
import { EmployeeTrackingComponent } from "./pages/employee-tracking/employee-tracking.component";
import { HealthAnalysisComponent } from "./pages/health-analysis/health-analysis.component";
import { HealthStatusComponent } from "./pages/health-status/health-status.component";
import { BookedAppointmentComponent } from "./pages/booked-appointment/booked-appointment.component";
import { DataTablesModule } from "angular-datatables";
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
  MatTableModule
} from "@angular/material";

@NgModule({
  declarations: [
    CompanyComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    AppointmentComponent,
    MedicalRecordComponent,
    PerscriptionComponent,
    OdersComponent,
    RecommendComponent,
    ServiceComponent,
    EventsArticleComponent,
    EmployeeCheckupComponent,
    EmployeeRegistrationComponent,
    FeedbackComponent,
    EmployeeTrackingComponent,
    HealthAnalysisComponent,
    HealthStatusComponent,
    BookedAppointmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
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
    DataTablesModule
  ]
})
export class CompanyModule {}
