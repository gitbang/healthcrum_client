import { Component, OnInit } from "@angular/core";

import * as $ from "jquery";
import {
  NgWizardConfig,
  THEME,
  StepChangedArgs,
  NgWizardService
} from "ng-wizard";

import {
  faUserMd,
  faUserEdit,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.scss"]
})
export class DoctorsComponent implements OnInit {
  doc_icon = faUserMd;
  doc_add = faUserPlus;
  doc_edit = faUserEdit;
  phide: boolean = true;
  hide: boolean = true;
  genderList: string[] = ["Male", "Female", "other"];
  name: string;
  age: string;
  gender: string;

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots
  };
  constructor(private ngWizardService: NgWizardService) {}

  ngOnInit() {}

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }
}
