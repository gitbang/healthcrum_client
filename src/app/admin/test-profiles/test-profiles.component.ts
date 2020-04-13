import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";
import { AdminService } from "app/services/admin.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-test-profiles",
  templateUrl: "./test-profiles.component.html",
  styleUrls: ["./test-profiles.component.scss"]
})
export class TestProfilesComponent implements OnInit {
  user_name: String;
  fasting: boolean;
  sample_required: boolean;
  profileTest: any[] = [];
  todo: any[] = [];
  done: any[] = [];

  //form_fields
  test_name: string;
  when: string;
  why: string;
  what: string;
  sample: string;
  fasting_time: string;
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

  constructor(private http: HttpClient, private adminService: AdminService) {}

  ngOnInit() {
    this.getProfileTestList();
    this.adminService.getTestList().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach(element => {
          this.todo.push(element);
        });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  changeFastingYes() {
    this.fasting = true;
  }
  changeFastingNo() {
    this.fasting = false;
  }
  sampleRequiredYes() {
    this.sample_required = true;
  }
  sampleRequiredNo() {
    this.sample_required = false;
  }

  getProfileTestList() {
    this.adminService.getProfileTest().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach(element => {
          this.profileTest.push(element);
        });
      }
    });
  }

  saveProfileTest() {
    if (this.validateForm()) {
      let test_ids = [];
      this.done.forEach(el => {
        test_ids.push(el._id);
      });
      let data = {
        name: this.test_name,
        what: this.what,
        why: this.why,
        when: this.when,
        requiredSamples: this.sample_required ? this.sample : "no",
        recommended_age: this.recommended_age,
        fasting: this.fasting ? this.fasting_time : "not required",
        recommended_for: [
          this.male ? "Male" : "",
          this.female ? "Female" : "",
          this.kids ? "Kids" : ""
        ],
        reportingTime: {
          from: this.reporting_from,
          to: this.reporting_to
        },
        tests: test_ids,
        mrp: this.mrp,
        offerPrice: this.offer_price,
        healthcrumPrice: this.healthcrum_price
      };

      this.adminService.saveProfileTest(data).subscribe(res => {
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Profile test has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: res.msg ? res.msg : "Something went wrong"
          });
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.test_name) {
      this.showError("Enter name of the Profile Test");
      return false;
    }
    if (!this.what) {
      this.showError("Write what will be get tested in this profile test");
      return false;
    }
    if (!this.when) {
      this.showError("Write when patient should do this profile test");
      return false;
    }
    if (!this.why) {
      this.showError("Write why patient dp this profile test");
      return false;
    }
    if (this.sample_required && !this.sample) {
      this.showError("Enter what sample are required");
      return false;
    }
    if (this.fasting && !this.fasting_time) {
      this.showError("Enter the fasting time required");
      return false;
    }
    if (!this.recommended_age) {
      this.showError("Enter the Recommended age for tests");
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
    if (this.done.length < 1) {
      this.showError("Drag some tests to profile test");
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
