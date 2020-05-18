import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PatientRoutes } from "./patient.routing";
import { PatientComponent } from "./patient.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PatientreportsComponent } from "./patientreports/patientreports.component";
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { PatientTestsComponent } from "./patient-tests/patient-tests.component";
import { PatientApponitmentsComponent } from "./patient-apponitments/patient-apponitments.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HealthStatusComponent } from "./health-status/health-status.component";
import { PatientPerscriptionComponent } from "./patient-perscription/patient-perscription.component";
import { PatientOrdersComponent } from "./patient-orders/patient-orders.component";
import { PatientServicesComponent } from "./patient-services/patient-services.component";
import { PatientFeedbackComponent } from "./patient-feedback/patient-feedback.component";
import { HraStoryBoardComponent } from "./hra-story-board/hra-story-board.component";
import { ViewDoctorComponent } from "./view-doctor/view-doctor.component";
import {
  PatientEhrComponent,
  MedecineDetailFillDialog,
  TestDetailFillDialog,
} from "./patient-ehr/patient-ehr.component";
import { GaugeChartModule } from "angular-gauge-chart";
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
  MatTableModule,
  MatCardModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatListModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatTabsModule,
  MatSnackBarModule,
} from "@angular/material";
import { NgCircleProgressModule } from "ng-circle-progress";
import { ChartsModule } from "ng2-charts";
import { SlickCarouselModule } from "ngx-slick-carousel";

@NgModule({
  declarations: [
    PatientComponent,
    DashboardComponent,
    PatientreportsComponent,
    PatientProfileComponent,
    PatientTestsComponent,
    PatientApponitmentsComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    HealthStatusComponent,
    PatientPerscriptionComponent,
    PatientOrdersComponent,
    PatientServicesComponent,
    PatientFeedbackComponent,
    HraStoryBoardComponent,
    ViewDoctorComponent,
    PatientEhrComponent,
    MedecineDetailFillDialog,
    TestDetailFillDialog,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PatientRoutes),
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
    ChartsModule,
    DataTablesModule,
    GaugeChartModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatAutocompleteModule,
    SlickCarouselModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    NgCircleProgressModule.forRoot({
      backgroundColor: "#FDB900",
      radius: 60,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: "#ffffff",
      outerStrokeGradientStopColor: "#ffffff",
      innerStrokeColor: "#ffffff",
      innerStrokeWidth: 10,
      title: "Healthcrum",
      animateTitle: false,
      animationDuration: 1000,
      showUnits: true,
      showBackground: true,
      clockwise: true,
      startFromZero: false,
      imageHeight: 100,
      imageWidth: 100,
      titleColor: "#ffffff",
      subtitleColor: "#ffffff",
      showSubtitle: false,
      unitsColor: "#ffffff",
    }),
  ],
  entryComponents: [MedecineDetailFillDialog, TestDetailFillDialog],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
  ],
})
export class PatientModule {}
