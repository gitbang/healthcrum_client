import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { AdminService } from "app/services/admin.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-packages",
  templateUrl: "./packages.component.html",
  styleUrls: ["./packages.component.scss"],
})
export class PackagesComponent implements OnInit {
  //profile tests autocomplete
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  profileCtrl = new FormControl();
  testCtrl = new FormControl();
  filteredProfiles: Observable<string[]>;
  filteredTests: Observable<any[]>;
  profiles: string[] = [];
  tests: any[] = [];
  allTests: any[] = [];
  allProfiles: string[] = [];

  @ViewChild("profileInput", null) profileInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto", null) matAutocomplete: MatAutocomplete;
  @ViewChild("testInput", null) testInput: ElementRef<HTMLInputElement>;
  @ViewChild("testAuto", null) testMatAutocomplete: MatAutocomplete;

  user_name: String;
  stodo: any[] = [];
  sdone: any[] = [];
  todo: any[] = [];
  done: any[] = [];
  packages: any[] = [];

  //form_fields
  test_name: string;
  when: string;
  why: string;
  what: string;
  male = false;
  female = false;
  kids = false;
  recommended_for: string;
  recommended_age: string;
  reporting_to: string;
  reporting_from: string;
  indivisual_tests: string;
  mrp: string;
  offer_price: string;
  healthcrum_price: string;

  constructor(private adminService: AdminService) {
    this.filteredProfiles = this.testCtrl.valueChanges.pipe(
      startWith(null),
      map((profile: string | null) =>
        profile ? this._filter(profile) : this.allProfiles.slice()
      )
    );

    this.filteredTests = this.testCtrl.valueChanges.pipe(
      startWith(null),
      map((test: string | null) =>
        test ? this._filterTest(test) : this.allTests.slice()
      )
    );
  }

  ngOnInit() {
    this.adminService.getPackages().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach((element) => {
          this.packages.push(element);
        });
      }
    });

    this.getProfileTestList();
    this.adminService.getTestList().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach((element) => {
          this.stodo.push(element);
          this.allTests.push(element.name);
        });
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || "").trim()) {
      this.profiles.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
    this.profileCtrl.setValue(null);
  }

  addTest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || "").trim()) {
      this.tests.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
    this.testCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.profiles.indexOf(fruit);
    if (index >= 0) {
      this.profiles.splice(index, 1);
    }
  }

  removeTest(test: string): void {
    const index = this.tests.indexOf(test);
    if (index >= 0) {
      this.tests.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.profiles.push(event.option.viewValue);
    this.profileInput.nativeElement.value = "";
    this.profileCtrl.setValue(null);
  }
  selectedTest(event: MatAutocompleteSelectedEvent): void {
    this.tests.push(event.option.viewValue);
    this.testInput.nativeElement.value = "";
    this.testCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allProfiles.filter(
      (profile) => profile.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterTest(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTests.filter(
      (test) => test.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getProfileTestList() {
    this.adminService.getProfileTest().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach((element) => {
          this.todo.push(element);
          this.allProfiles.push(element.name);
        });
      }
    });
  }

  savePackage() {
    if (this.validateForm()) {
      let test_ids = [];
      let profile_ids = [];
      this.done.forEach((el) => {
        profile_ids.push(el._id);
      });
      this.sdone.forEach((el) => {
        test_ids.push(el._id);
      });
      let data = {
        name: this.test_name,
        what: this.what,
        why: this.why,
        when: this.when,
        recommended_age: this.recommended_age,
        recommended_for: [
          this.male ? "Male" : "",
          this.female ? "Female" : "",
          this.kids ? "Kids" : "",
        ],
        reportingTime: {
          from: this.reporting_from,
          to: this.reporting_to,
        },
        tests: test_ids,
        profileTests: profile_ids,
        mrp: this.mrp,
        offerPrice: this.offer_price,
        healthcrumPrice: this.healthcrum_price,
      };

      this.adminService.savePackage(data).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Package has been created successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: res.msg ? res.msg : "Something went wrong",
          });
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.test_name) {
      this.showError("Enter name of the package name");
      return false;
    }
    if (!this.what) {
      this.showError("Write what will be get tested in this package");
      return false;
    }
    if (!this.when) {
      this.showError("Write when patient should do use package");
      return false;
    }
    if (!this.why) {
      this.showError("Write why patient buy this package");
      return false;
    }

    if (!this.recommended_age) {
      this.showError("Enter the Recommended age for package");
      return false;
    }
    if (!this.reporting_from) {
      this.showError("Enter provide repoting open time");
      return false;
    }
    if (!this.reporting_to) {
      this.showError("Enter provide repoting close time");
      return false;
    }
    if (this.done.length < 1 && this.sdone.length < 1) {
      this.showError("Drag some tests to package");
      return false;
    }
    if (!this.mrp) {
      this.showError("Enter Test MRP");
      return false;
    }
    if (!this.healthcrum_price) {
      this.showError("Enter healthcrum price");
      return false;
    }
    if (!this.offer_price) {
      this.showError("Enter offer price");
      return false;
    }
    return true;
  }

  showError(msg: string) {
    Swal.fire(msg);
  }
}
