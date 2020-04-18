import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

// insert a a service
import { PatientService } from "../patient.service";

@Component({
  selector: "app-hra-story-board",
  templateUrl: "./hra-story-board.component.html",
  styleUrls: ["./hra-story-board.component.scss"],
})
export class HraStoryBoardComponent implements OnInit {
  /*
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
  constructor(private router: Router, private service : PatientService) {}

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


  // get question from database .. a a ..
  getQuestion(category){
    //console.log(category)
    this.service.getQuestion(category).subscribe((result : any)=>{
      console.log(result)
    });
  }  */
  //===============================================================================================//

  constructor(private router: Router, private service: PatientService) {}

  category_array = [
    "Life Style",
    "Physical Health",
    "General Health",
    "Dietary Habits",
    "Occupational Wellness",
    "Stress Assessment",
    "Family History",
    "Senior Citizen Assessment",
    "Maternity Risk Assessment",
  ];
  category_index = 0;
  questions: any;
  ngOnInit() {
    this.service
      .getQuestions(this.category_array[this.category_index])
      .subscribe((questions: any) => {
        console.log(questions);
        this.questions = questions;
        this.organiseQuestions();
        this.total = this.questions.length;
      });
  }
  currentQuestion = {
    _id: "", // main question _id
    mainans: "",
    mainScore: "",
    subquestion: [
      {
        subAns: "",
        value: Number,
      },
    ],
  };
  index = 0;
  total;
  subTotal;
  subIndex = 0;
  current = 1;
  control = "main";
  fromUser = [
    {
      questionId: "", // main question _id
      mainans: "",
      mainScore: "",
      subquestion: [
        {
          subAns: "",
          value: "",
        },
      ],
    },
  ];
  organiseQuestions() {
    this.currentQuestion = this.questions[this.index];
  }

  goBack(i) {
    console.log(i);
    this.index = this.index - 1;
    this.current = this.index + 1;
    this.currentQuestion = this.questions[this.index];
    console.log(this.currentQuestion);
  }

  selectCondition(value) {
    if (!this.fromUser[this.index]) {
      return false;
    } else if (this.fromUser[this.index].mainans == value) {
      return true;
    } else return false;
  }

  executeSubQuestion(subans = "", subvalue = 0) {
    console.log("ans and value are");
    console.log(subans, subvalue);
    var temp = {
      subAns: subans,
      value: subvalue.toString(),
    };
    this.fromUser[this.index].subquestion[this.subIndex] = temp;
    if (this.subIndex >= this.questions[this.index].subQuestionAre.length) {
    } else if (this.subIndex > 0) {
      this.control = "main";
      this.normalFlow();
    }
  }

  normalFlow() {
    console.log("contiue");
    this.index = this.index + 1;
    this.current = this.index + 1;
    console.log("index is ", this.index);
    console.log("question length : ", this.questions.length);
    if (this.index < this.questions.length) {
      this.organiseQuestions();
    } else if (this.category_index < this.category_array.length) {
      // save api should add here
      this.category_index++;
      this.service
        .getQuestions(this.category_array[this.category_index])
        .subscribe((questions: any) => {
          console.log(questions);
          this.questions = questions;
          this.index = 0;
          this.fromUser.length = 0;
          this.fromUser = [];
          this.current = this.index + 1;
          this.total = this.questions.length;
          this.organiseQuestions();
        });
    } else {
      this.service.saveAns(this.fromUser).subscribe((response) => {
        console.log(response);
      });
    }
  }

  async submit(ans, value) {
    // if(this.control == "subquestion") {
    //    this.executeSubQuestion(ans, value)
    // }
    //else {
    var temp = {
      questionId: this.currentQuestion._id,
      mainans: ans,
      mainScore: value,
      subquestion: [],
    };
    this.fromUser[this.index] = temp;
    if (this.questions[this.index].subQuestion == true && false) {
      this.subTotal = this.questions[this.index].subQuestionAre.length;
      //this.control = "subquestion";
      this.currentQuestion = this.questions[this.index].subQuestionAre[
        this.subIndex
      ];
      console.log(this.currentQuestion);
      //this.executeSubQuestion()
    } else {
      this.normalFlow();
    }
    //}
  }
}
