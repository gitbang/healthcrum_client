import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDashboardComponent } from './common-dashboard/common-dashboard.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

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
  MatAutocompleteModule
} from "@angular/material";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [CommonDashboardComponent],
  imports: [
  CommonModule,
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
  FontAwesomeModule
  ],
  entryComponents:[CommonDashboardComponent],
  exports :[
    CommonDashboardComponent
  ]
})
export class SharedModule { }
