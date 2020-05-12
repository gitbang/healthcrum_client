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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {MatMenuModule} from '@angular/material/menu'
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
  MatCardModule,
  MatTabsModule,
  MatListModule,
  MatButtonToggleModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatSidenavModule,
  MatToolbarModule,
  MatPaginatorModule
} from "@angular/material";
import { ChartsModule } from "ng2-charts";
import { SharedModule } from "app/shared/shared.module";
import {CompanyService} from './company.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterationFormComponent } from './pages/employee-registration/registeration-form/registeration-form.component';
import { AddEventArticleComponent } from './pages/events-article/add-event-article/add-event-article.component';
import {AddFeedbackComponent} from './pages/feedback/add-feedback/add-feedback.component'
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
    BookedAppointmentComponent,
    RegisterationFormComponent,
    AddEventArticleComponent,
    AddFeedbackComponent
  ],
  entryComponents : [
    RegisterationFormComponent,
    AddEventArticleComponent,
    AddFeedbackComponent
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
    DataTablesModule,
    CommonModule,
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
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatProgressBarModule,
    ChartsModule,
    MatChipsModule,
    MatAutocompleteModule,
    DataTablesModule,
    SharedModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    NgCircleProgressModule,
    MatSnackBarModule
  ],
  providers : [CompanyService]
})
export class CompanyModule {}
