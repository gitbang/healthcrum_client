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
  MatCardModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material";

import { AdminLayoutComponent } from "./admin-layout.component";
import { MapLocationSelectorComponent } from "./shared/map-location-selector/map-location-selector.component";
import { AgmCoreModule } from "@agm/core";
import { CorporateEntryComponent } from "./corporate-entry/corporate-entry.component";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzIconModule } from "ng-zorro-antd/icon";
import { LocationsComponent } from "./locations/locations.component";
import { AddressComponent } from "./locations/address/address.component";
import { AreaComponent } from "./locations/area/area.component";
import { CityComponent } from "./locations/city/city.component";
import { StateComponent } from "./locations/state/state.component";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzNotificationModule } from "ng-zorro-antd/notification";

import { WellnessServicesComponent } from "./wellness-services/wellness-services.component";
import { WellnessComponent } from "./wellness-services/wellness/wellness.component";
import { YogaComponent } from "./wellness-services/yoga/yoga.component";
import { GymComponent } from "./wellness-services/gym/gym.component";
import { DitecianComponent } from "./wellness-services/ditecian/ditecian.component";
import { SpaComponent } from "./wellness-services/spa/spa.component";
import { ZumbaComponent } from "./wellness-services/zumba/zumba.component";
import { WebinarComponent } from "./wellness-services/webinar/webinar.component";
import { ProductsInventryComponent } from "./products-inventry/products-inventry.component";
import { EquipmentsComponent } from "./products-inventry/equipments/equipments.component";
import { MedecinesComponent } from "./products-inventry/medecines/medecines.component";
import { EquipmentInventryComponent } from "./equipment-inventry/equipment-inventry.component";
import { EquipmentPurchaseComponent } from "./equipment-purchase/equipment-purchase.component";
import { MedecinesPurchaseComponent } from "./medecines-purchase/medecines-purchase.component";
import { MedecinesInventryComponent } from "./medecines-inventry/medecines-inventry.component";
import { FeedbacksComponent } from "./feedbacks/feedbacks.component";
import { EmployeesTempComponent } from "./employees-temp/employees-temp.component";
import { ChartsModule } from "ng2-charts";
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
    MatSlideToggleModule,
    MatAutocompleteModule,
    DataTablesModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    NgWizardModule.forRoot(ngWizardConfig),
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    }),
    NzUploadModule,
    NzModalModule,
    NzFormModule,
    NzMessageModule,
    NzSpinModule,
    NzIconModule,
    NzCardModule,
    NzTabsModule,
    NzTableModule,
    NzPopconfirmModule,
    NzInputModule,
    NzSelectModule,
    NzDropDownModule,
    NzNotificationModule,
    ChartsModule,
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
    CorporateEntryComponent,
    LocationsComponent,
    AddressComponent,
    AreaComponent,
    CityComponent,
    StateComponent,
    WellnessServicesComponent,
    WellnessComponent,
    YogaComponent,
    GymComponent,
    DitecianComponent,
    SpaComponent,
    ZumbaComponent,
    WebinarComponent,
    ProductsInventryComponent,
    EquipmentsComponent,
    MedecinesComponent,
    EquipmentInventryComponent,
    EquipmentPurchaseComponent,
    MedecinesPurchaseComponent,
    MedecinesInventryComponent,
    FeedbacksComponent,
    EmployeesTempComponent,
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
