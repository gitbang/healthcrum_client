import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { ComponentsModule } from "./components/components.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { LabsComponent } from "./labs/labs.component";
import { TableListComponent } from "./table-list/table-list.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PackagesComponent } from "./packages/packages.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TestsComponent } from "./tests/tests.component";
import { NgWizardModule, NgWizardConfig, THEME } from "ng-wizard";
import { TestProfilesComponent } from "./test-profiles/test-profiles.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.dots
};

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
  MatChipsModule,
  MatAutocompleteModule
} from "@angular/material";

import { AdminLayoutComponent } from "./admin-layout.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FontAwesomeModule,
    DragDropModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatCommonModule,
    MatNativeDateModule,
    MatRadioModule,
    MatStepperModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgWizardModule.forRoot(ngWizardConfig)
  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserProfileComponent,
    HospitalsComponent,
    LabsComponent,
    DoctorsComponent,
    PackagesComponent,
    TestsComponent,
    TestProfilesComponent,
    TableListComponent
  ],
  exports: [RouterModule],
  bootstrap: [AdminLayoutComponent]
})
export class AdminLayoutModule {}
