import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import * as $ from "jquery";
// insert a a service
import { PatientService } from "../patient.service";
import {AuthServiceLocal} from '../../services/auth-service.service';


@Component({
  selector: "app-hra-story-board",
  templateUrl: "./hra-story-board.component.html",
  styleUrls: ["./hra-story-board.component.scss"],
})
export class HraStoryBoardComponent implements OnInit {
  //===============================================================================================//
  colors: any[] = [
    "#2f8fd6",
    "#972c95",
    "#800080",
    "#008080",
    "#ccac95",
    "#04b000",
    "#c1d4cc",
    "#ae1d08",
    "#ffd700",
  ];
  completed: number[] = [50, 20, 70, 54, 83, 62, 95, 80, 58];
  constructor(
    private router: Router, 
    private service: PatientService,
    private localService : AuthServiceLocal  
  ) {}
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

  progress_step_value = 0;
  questions: any;
  ngOnInit() {
    let role = this.localService.getUserRole();
    if(role != 'doctor') {
      this.router.navigateByUrl('/login')
    }

    this.service
      .getQuestions(this.category_array[this.category_index])
      .subscribe((questions: any) => {
        console.log(questions);
        this.questions = questions;
        this.organiseQuestions();
        this.total = this.questions.length;
        this.progress_step_value = Math.round(100 / this.total);
      });
  }
  currentQuestion = {
    _id: "", // main question _id
    mainans: "",
    mainScore: "",
    condition: "",
    subquestion: [
      {
        subAns: "",
        value: Number,
      },
    ],
  };
  index = 0;
  total: number = 0;
  subTotal: number = 0;
  subIndex: number = 0;
  current: number = 1;
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
    //console.log("organised data reached");
    this.currentQuestion = this.questions[this.index];
  }

  goBack(i) {
    if (this.control == "subquestion") {
      if (this.subIndex > 0) {
        this.subIndex = this.subIndex - 1;
        this.currentQuestion = this.questions[this.index].subQuestionAre[
          this.subIndex
        ];
      } else {
        this.currentQuestion = this.questions[this.index];
        this.control = "main";
      }
    } else if (this.control == "main") {
      if (this.fromUser[this.index - 1].subquestion.length != 0) {
        this.index = this.index - 1;
        this.subIndex = this.questions[this.index].subQuestionAre.length - 1;
        this.currentQuestion = this.questions[this.index].subQuestionAre[
          this.subIndex
        ];
        this.control = "subquestion";
      } else {
        this.index = this.index - 1;
        this.currentQuestion = this.questions[this.index];
        this.control = "main";
      }
    }
    this.current = this.index + 1;
  }

  selectCondition(value) {
    if (this.control == "main") {
      if (!this.fromUser[this.index]) {
        return false;
      } else if (this.fromUser[this.index].mainans == value) {
        return true;
      } else return false;
    } else {
      if (!this.fromUser[this.index].subquestion[this.subIndex]) {
        return false;
      } else if (
        this.fromUser[this.index].subquestion[this.subIndex].subAns == value
      ) {
        return true;
      } else return false;
    }
  }

  executeSubQuestion(subans = "", subvalue = 0) {
    var temp = {
      subAns: subans,
      value: !subvalue ? "0" : subvalue.toString(),
    };
    this.fromUser[this.index].subquestion[this.subIndex] = temp;
    this.subIndex++;
    if (this.subIndex < this.questions[this.index].subQuestionAre.length) {
      this.currentQuestion = this.questions[this.index].subQuestionAre[
        this.subIndex
      ];
    } else if (this.subIndex > 0) {
      this.control = "main";
      this.subIndex = 0;
      this.normalFlow();
    }
  }

  normalFlow() {
    this.index = this.index + 1;
    this.current = this.index + 1;
    if (this.index < this.questions.length) {
      this.organiseQuestions();
    } else if (this.category_index < this.category_array.length) {
      this.service.saveAns(this.fromUser).subscribe((response) => {
        console.log(response);
      });
      this.category_index++;
      this.service
        .getQuestions(this.category_array[this.category_index])
        .subscribe((questions: any) => {
          this.questions = questions;
          this.index = 0;
          this.fromUser.length = 0;
          this.fromUser = [];
          this.current = this.index + 1;
          this.total = this.questions.length;
          this.subTotal = 0;
          this.progress_step_value = Math.round(100 / this.total);
          this.organiseQuestions();
        });
    }
  }

  async submit(ans, value) {
    if (this.control == "subquestion") {
      this.executeSubQuestion(ans, value);
    } else {
      this.subTotal = 0;
      var temp = {
        questionId: this.currentQuestion._id,
        mainans: ans,
        mainScore: value,
        subquestion: [],
      };
      if (!this.fromUser[this.index] || this.fromUser.length == 1) {
        this.fromUser[this.index] = temp;
      } else {
        this.fromUser[this.index].mainans = ans;
        this.fromUser[this.index].mainScore = value;
      }
      if (this.questions[this.index].subQuestion == true) {
        if (
          this.currentQuestion.condition == ans ||
          (ans != "no" && this.currentQuestion.condition == "!no")
        ) {
          this.subTotal = this.questions[this.index].subQuestionAre.length;
          this.control = "subquestion";
          this.currentQuestion = this.questions[this.index].subQuestionAre[
            this.subIndex
          ];
        } else {
          this.fromUser[this.index].subquestion = [];
          this.normalFlow();
        }
      } else {
        this.fromUser[this.index].subquestion = [];
        this.normalFlow();
      }
    }
  }
  changeCategory(index: number) {
    this.category_index = index;
    this.service
      .getQuestions(this.category_array[index])
      .subscribe((questions: any) => {
        this.questions = questions;
        this.index = 0;
        this.fromUser.length = 0;
        this.fromUser = [];
        this.current = this.index + 1;
        this.total = this.questions.length;
        this.subTotal = 0;
        this.progress_step_value = Math.round(100 / this.total);
        this.organiseQuestions();
      });
  }

  showNext() {}
}
