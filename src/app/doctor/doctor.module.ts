import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { DoctorRoutes } from "./doctor.routing";
import { DoctorComponent } from "./doctor.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MedicalRecordComponent } from "./pages/medical-record/medical-record.component";
import { PerscriptionComponent } from "./pages/perscription/perscription.component";
import { OdersComponent } from "./pages/oders/oders.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AppointmentComponent } from "./pages/appointment/appointment.component";
import { RecommendComponent } from "./pages/recommend/recommend.component";
import { ServiceComponent } from "./pages/service/service.component";
import { PatientCheckupComponent } from "./pages/patient-checkup/patient-checkup.component";

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
  MatExpansionModule,
  MatProgressBarModule,
  MatChipsModule,
  MatAutocompleteModule
} from "@angular/material";
import { DataTablesModule } from "angular-datatables";
import { ChartsModule } from "ng2-charts";
import { EPrescriptionComponent } from './pages/e-prescription/e-prescription.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DoctorComponent,
    DashboardComponent,
    MedicalRecordComponent,
    PerscriptionComponent,
    OdersComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    RecommendComponent,
    ServiceComponent,
    PatientCheckupComponent,
    EPrescriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DoctorRoutes),
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
    SharedModule
  ]
})
export class DoctorModule {}
