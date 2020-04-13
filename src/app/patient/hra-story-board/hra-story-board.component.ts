import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

// insert a a service
import {PatientService} from  '../patient.service'

@Component({
  selector: "app-hra-story-board",
  templateUrl: "./hra-story-board.component.html",
  styleUrls: ["./hra-story-board.component.scss"]
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

  constructor( private router: Router, private service : PatientService) { }

  questions : any
  ngOnInit() {
    this.service.getQuestions().subscribe((questions : any)=>{
      console.log(questions);
      this.questions = questions;
      this.organiseQuestions();
      this.total = this.questions.length;
    })
  }
  currentQuestion = {
    _id : '',           // main question _id
    mainans : '',
    mainScore : '',
    subquestion : [{
        subAns : '',
        value : Number
    }]
  };
  index = 0;
  total 
  current = 1
  fromUser = [{
    questionId : '',           // main question _id
    mainans : '',
    mainScore : '',
    subquestion : [{
        subAns : String,
        value : Number
    }]
  }]
  organiseQuestions () {
    this.currentQuestion = this.questions[this.index];
    console.log(this.currentQuestion);
  }
  goBack(i){
    console.log(i);
    this.index = this.index  - 1; 
    this.current = this.index + 1
    this.currentQuestion = this.questions[this.index];
    console.log(this.currentQuestion);
  } 
  selectCondition(value) {
    console.log("select condition")
    console.log(value);
    console.log(this.fromUser)
      if(!this.fromUser[this.index]) {
        console.log("if executed");
        return false;
      }
      else if(this.fromUser[this.index].mainans == value){
        console.log("else executed")
        return true;
      }
      else return false;
       // else{
    //   if(valu)
    // }
  }

  submit(ans, value){
   var temp  = { 
      questionId : this.currentQuestion._id,
      mainans : ans,
      mainScore : value,
      subquestion : []
    }
    this.fromUser[this.index] = temp;
    console.log(this.fromUser)
    console.log("temp ", temp)
    this.index = this.index + 1; 
    this.current = this.index + 1
    //console.log(ans);  
    //console.log(value);
    
    //console.log(this.questions[this.index].condition);
    //this.fromUser.push(temp)
    // if(this.questions[this.index].subQuestion != false && this.questions[this.index].condition == ans.option) {
    //   this.subquestion(temp);
    // }
    if(this.index <  this.questions.length - 1) {
      this.organiseQuestions();
    }
    /*
    else {
      this.service.saveAns(this.fromUser).subscribe((response)=>{
        console.log(response)
      });
    } */
  }
}
