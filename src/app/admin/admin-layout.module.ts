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
import { DataTablesModule } from "angular-datatables";
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.dots,
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
  MatDialogModule,
  MatAutocompleteModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material";

import { AdminLayoutComponent } from "./admin-layout.component";
import { MapLocationSelectorComponent } from "./shared/map-location-selector/map-location-selector.component";
import { AgmCoreModule } from "@agm/core";
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
    DataTablesModule,
    MatDialogModule,
    NgWizardModule.forRoot(ngWizardConfig),
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    }),
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
    TableListComponent,
    MapLocationSelectorComponent,
  ],
  exports: [RouterModule],
  bootstrap: [AdminLayoutComponent],
  entryComponents: [MapLocationSelectorComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
  ],
})
export class AdminLayoutModule {}
