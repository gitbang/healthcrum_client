import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { PatientService } from "../patient.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl } from "@angular/forms";
import { AuthServiceLocal } from "app/services/auth-service.service";

@Component({
  selector: "app-temperature-entry",
  templateUrl: "./temperature-entry.component.html",
  styleUrls: ["./temperature-entry.component.scss"],
})
export class TemperatureEntryComponent implements OnInit {
  title: string = "COVID19 Safty prevention Questionnaires ?";
  temperature: String;
  loading: boolean = true;
  askQuestion: boolean = false;
  questionEnd: boolean = false;
  questions: any[];
  currentQuestion: any;
  currentIndex: number;
  selectedAnswer;
  showBack: boolean = false;
  temperatureData: any[] = [];
  color: ThemePalette = "warn";
  date = new FormControl();
  userID:String = "";
  constructor(
    private patientService: PatientService,
    private _snackBar: MatSnackBar,
    private authLocal: AuthServiceLocal,
  ) {
    this.userID = this.authLocal.getUserID;
  }

  ngOnInit() {
    let data = {
      user_id: this.userID,
    };
    this.patientService.getCovidAnswers(data).subscribe((res: any) => {
      if (res.success) {
        if (res.data.length <= 0) {
          this.getQuestions();
        } else {
          this.askWeeklyQuestion();
          //this.getTemprature();
        }
      } else {
        this.getQuestions();
      }
    });
    //this.getTemprature();
  }

  getQuestions() {
    this.loading = true;
    this.patientService.getCovidInitialQuestion().subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        localStorage.setItem("question_type", "once");
        this.askQuestion = true;
        this.questions = res.data;
        this.setQuestionToShow(0);
      } else {
        this.askWeeklyQuestion();
      }
    });
  }

  askWeeklyQuestion() {
    this.loading = true;
    this.patientService.getWeeklySettings().subscribe((res: any) => {
      this.loading = false;
      if (res.success) {
        res = res.data[0];
        let d = new Date();
        if (res.days.filter((el) => el === d.getDay()).length > 0) {
          this.needToAskQuestion();
        } else {
          this.loading = false;
          this.questionDone();
        }
      } else {
        alert(res.message);
      }
    });
  }
  needToAskQuestion() {
    this.loading = true;
    this.patientService
      .needToAskQuestion({ user_id: this.userID })
      .subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
          if (res.data.length == 0 || res.data.weeklyAns == "") {
            this.getWeeklyQuestions();
          } else {
            this.questionDone();
          }
        }
      });
  }

  getWeeklyQuestions() {
    this.loading = true;
    this.patientService.getWeeklyQuestion().subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        localStorage.setItem("question_type", "weekly");
        this.title = "Weekly Questionnaires";
        this.askQuestion = true;
        this.questions = res.data;
        this.setQuestionToShow(0);
      } else {
        this.questionDone();
      }
    });
  }

  setQuestionToShow(index) {
    this.currentIndex = index;
    this.currentQuestion =
      this.questions.length > index ? this.questions[this.currentIndex] : {};
    if (this.currentQuestion.ans == "") {
      this.currentQuestion.ans = Date.now();
    }
  }
  answerSelected(event) {
    if (this.selectedAnswer == "yes") {
      this.questions[this.currentIndex].ans = true;
    } else {
      this.questions[this.currentIndex].ans = false;
    }
    this.currentIndex++;
    // if (this.currentIndex > 0) {
    //   this.showBack = true;
    // }
    if (this.currentIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentIndex];
      if (this.currentQuestion.ans == "") {
        this.currentQuestion.ans = Date.now();
      }
      this.selectedAnswer = Date.now();
    } else {
      if (localStorage.getItem("question_type") == "once") {
        this.saveAnswers();
      } else {
        this.saveWeeklyAnswers();
      }
    }
  }

  questionDone() {
    this.getTemprature();
    this.questionEnd = true;
    this.askQuestion = false;
    // window.location.reload();
  }

  saveTemperature() {
    let data = {
      user_id: this.userID,
      corporate_id: this.authLocal.getUserCorporateID,
      branch_id: this.authLocal.getUserBranchID,
      department: this.authLocal.getUserDepartmentID,
      temperature: this.temperature,
    };
    this.patientService.saveTemperature(data).subscribe((res: any) => {
      if (res.success) {
        this.getTemprature();
        this._snackBar.open("Temperature added successfully !", "UNDO", {
          duration: 5 * 1000,
        });
      } else {
        this._snackBar.open(res.message, "UNDO", {
          duration: 5 * 1000,
        });
      }
    });
  }

  saveAnswers() {
    this.loading = true;
    let data = {
      user_id: this.userID,
      corporate_id: this.authLocal.getUserCorporateID,
      branch_id: this.authLocal.getUserBranchID,
      department: this.authLocal.getUserDepartmentID,
      answers: JSON.stringify({
        answers: this.questions,
        status: this.getStatus(),
      }),
      weeklyAns: "",
    };
    this.patientService.saveCovidAnswers(data).subscribe((res: any) => {
      this.loading = false;
      if (res.success) {
        this.questionEnd = true;
        this._snackBar.open("Answeres saved successfully !", "UNDO", {
          duration: 5 * 1000,
        });
        this.askWeeklyQuestion();
      } else {
        this._snackBar.open(res.message, "UNDO", {
          duration: 5 * 1000,
        });
      }
    });
  }

  saveWeeklyAnswers() {
    this.loading = true;
    let data = {
      user_id: this.userID,
      answers: JSON.stringify({
        answers: this.questions,
        status: this.getStatusOfWeeklyAnswers(),
      }),
    };
    this.patientService.saveCovidWeeklyAnswers(data).subscribe((res: any) => {
      this.loading = false;
      if (res.success) {
        this.questionEnd = true;
        this._snackBar.open("Answeres saved successfully !", "UNDO", {
          duration: 5 * 1000,
        });
      } else {
        this._snackBar.open(res.message, "UNDO", {
          duration: 5 * 1000,
        });
      }
    });
  }

  getTemprature() {
    let data = {
      user_id: this.userID,
    };
    this.patientService.getTemperatures(data).subscribe((res: any) => {
      this.loading = false;
      if (res.success) {
        this.temperatureData = [];
        res.temperature.forEach((temp) => {
          this.temperatureData.push({
            temperature: temp.temperature,
            createdAt: temp.createdAt,
          });
        });
      }
    });
  }

  goBack() {
    if (this.currentIndex - 1 >= 0)
      this.setQuestionToShow(this.currentIndex - 1);
  }
  goNext() {
    this.questions[this.currentIndex] = this.currentQuestion;
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentIndex];
      this.selectedAnswer = Date.now();
    } else {
      if (localStorage.getItem("question_type") == "once") {
        this.saveAnswers();
      } else {
        this.saveWeeklyAnswers();
      }
      // this.questionEnd = true;
    }
  }
  dateChange(event) {
    let data = {
      user_id: this.userID,
      filter_date: {begin: new Date(event.value.begin).toLocaleDateString(), end: new Date(event.value.end).toLocaleDateString()},
    };
    this.patientService.getEmpTemperature(data).subscribe((res: any) => {
      console.log(res);
      this.temperatureData = [];
      if (res.success) {
        res.temperature.forEach((temp) => {
          this.temperatureData.push({
            temperature: temp.temperature,
            createdAt: temp.createdAt,
          });
        });
      }
    });
  }

  getStatus() {
    status = "safe";
    let danger = 0;
    let purple = 0;
    let green = 0;
    this.questions.forEach((el) => {
      if (el.multiple) {
        el.options.forEach((elmt) => {
          if (elmt.ans) {
            if (elmt.label == "red") danger = danger + 1;
            else if (elmt.label == "purple") purple = purple + 1;
            else if (elmt.label == "green") green = green + 1;
          }
        });
      } else {
        if (el.ans) {
          if (el.options[0].label == "red") danger = danger + 1;
          else if (el.options[0].label == "purple") purple = purple + 1;
          else if (el.options[0].label == "green") green = green + 1;
        }
      }
    });

    if (danger >= 2) {
      status = "danger";
    } else if (green && danger == 2) {
      status = "purple";
    }
    return status;
  }

  getStatusOfWeeklyAnswers() {
    status = "safe";
    let danger = 0;
    let purple = 0;
    let green = 0;
    this.questions.forEach((el) => {
      el.options.forEach((elmt) => {
        if (el.multiple) {
          if (elmt.ans) {
            if (elmt.label == "red") danger = danger + 1;
            else if (elmt.label == "purple") purple = purple + 1;
            else if (elmt.label == "green") green = green + 1;
          }
        }
      });
    });

    if (danger >= 2) {
      status = "danger";
    }
    if (
      danger == 2 &&
      this.questions[1].options[4].ans &&
      !this.questions[1].options[7].ans
    ) {
      status = "purple";
    }

    return status;
  }

  optionChecked(checked,option){
    if(checked && option == "None"){
      let opt = [];
      for(let i = 0;i<this.currentQuestion.options.length ; i++){
        if(this.currentQuestion.options[i].value != option){
          this.currentQuestion.options[i].ans = false;
        }
      }
    }else{
      for(let i = 0;i<this.currentQuestion.options.length ; i++){
        if(this.currentQuestion.options[i].value == "None"){
          this.currentQuestion.options[i].ans = false;
        }
      }
    }
    console.log(checked,option);
    console.log(this.currentQuestion);
  }
}
