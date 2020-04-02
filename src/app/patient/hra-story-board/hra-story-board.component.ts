import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-hra-story-board",
  templateUrl: "./hra-story-board.component.html",
  styleUrls: ["./hra-story-board.component.scss"]
})
export class HraStoryBoardComponent implements OnInit {
  current: number = 1;
  total: number;
  showNext: boolean = false;
  questions: any = [
    { question: "Question1", isMCQ: true, ans: -1 },
    { question: "Question2", isMCQ: true, ans: -1 },
    { question: "Question3", isMCQ: true, ans: -1 },
    { question: "Question4", isMCQ: true, ans: -1 },
    { question: "Question5", isMCQ: true, ans: -1 }
  ];
  constructor(private router: Router) {}

  ngOnInit() {
    this.total = this.questions.length;
  }

  setYes(index) {
    this.questions[index].ans = 1;
    if (index < this.total - 1) {
      this.current++;
    }
    if (this.current == this.total) {
      this.showNext = false;
    }
  }
  setNo(index) {
    this.questions[index].ans = 0;
    if (index < this.total - 1) {
      this.current++;
    }
  }
  goBack(index) {
    if (this.current <= 1) {
      return;
    } else {
      this.current--;
      this.showNext = true;
    }
  }
  submit() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your information has been saved!",
      showConfirmButton: false,
      timer: 1500
    });
    setTimeout(() => {
      this.router.navigate(["/patient/dashboard"]);
    }, 2234);
  }
  next(i) {
    this.current++;
    if (this.current > this.total - 1) {
      this.showNext = false;
    }
  }
}
