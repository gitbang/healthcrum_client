import { Component, OnInit } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.scss"]
})
export class TestsComponent implements OnInit {
  fasting: boolean;
  user_name: String;
  sample_required: boolean;
  testList: any[] = [];

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
  range_from: string;
  range_to: string;
  recommended_for: string;
  recommended_age: string;
  reporting_to: string;
  reporting_from: string;
  indivisual_tests: string;
  mrp: string;
  offer_price: string;
  healthcrum_price: string;
  testAddingLoader:boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getTestList().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data);
        res.data.forEach(element => {
          this.testList.push(element);
        });
      }
    });
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

  saveSingleTest() {
    if (this.validateForm()) {
      this.testAddingLoader = true;
      let data = {
        name: this.test_name,
        what: this.what,
        why: this.why,
        when: this.when,
        prescribed_range: {range_from:this.range_from, range_to: this.range_to},
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
        mrp: this.mrp,
        offerPrice: this.offer_price,
        healthcrumPrice: this.healthcrum_price
      };

      this.adminService.saveSingleTest(data).subscribe(res => {
        this.testAddingLoader = false;
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Test has been saved successfully !",
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
      this.showError("Enter name of Test");
      return false;
    }
    if (!this.what) {
      this.showError("Write what will be get tested in this test");
      return false;
    }
    if (!this.when) {
      this.showError("Write when patient should do this test");
      return false;
    }
    if (!this.why) {
      this.showError("Write why patient dp this test");
      return false;
    }
    if (!this.range_from && ! this.range_to) {
      this.showError("Provide prescribed test ranges");
      return false;
    }
    if (this.sample_required && !this.sample) {
      this.showError("Enter which sample is required");
      return false;
    }
    if (this.fasting && !this.fasting_time) {
      this.showError("Enter the required fasting time");
      return false;
    }
    if (!this.recommended_age) {
      this.showError("Enter the Recommended age for test");
      return false;
    }
    if (!this.reporting_from) {
      this.showError("Enter provide repoting start time");
      return false;
    }
    if (!this.reporting_to) {
      this.showError("Enter provide repoting end time");
      return false;
    }
    if (!this.mrp) {
      this.showError("Enter Test MRP");
      return false;
    }
    if (!this.healthcrum_price) {
      this.showError("Enter healthcrum price for Test");
      return false;
    }
    if (!this.offer_price) {
      this.showError("Enter offer price of test");
      return false;
    }
    return true;
  }

  showError(msg: string) {
    Swal.fire(msg);
  }
}
