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
  
  constructor( private router: Router, private service : PatientService) { }

  category_array = ['Life Style', 'Physical Health','General Health',  'Dietary Habits', 
                      'Occupational Wellness', 'Stress Assessment','Family History',
                      'Senior Citizen Assessment' ,'Maternity Risk Assessment']
  category_index = 0;
  questions : any
  ngOnInit() {
    this.service.getQuestions(this.category_array[this.category_index ]).subscribe((questions : any)=>{
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
    condition : '',
    subquestion : [{
        subAns : '',
        value : Number
    }]
  };
  index = 0;
  total; 
  subTotal;
  subIndex = 0;
  current = 1;
  control = "main";
  fromUser = [{
    questionId : '',           // main question _id
    mainans : '',
    mainScore : '',
    subquestion : [{
        subAns : '',
        value : ''        
    }]
  }]
  
  organiseQuestions () {
    //console.log("organised data reached");
    this.currentQuestion = this.questions[this.index];
  }

  goBack(i){
    if(this.control == "subquestion") {
      if(this.subIndex > 0) {
        this.subIndex = this.subIndex - 1;
        this.currentQuestion = this.questions[this.index].subQuestionAre[this.subIndex];
      } 
      else{
        this.currentQuestion = this.questions[this.index];
        this.control = "main";
      }
    }
    else if(this.control == "main") {
      if(this.fromUser[this.index - 1].subquestion.length != 0){ 
        this.index = this.index - 1
        this.subIndex = this.questions[this.index].subQuestionAre.length - 1;
        this.currentQuestion = this.questions[this.index].subQuestionAre[this.subIndex];
        this.control = "subquestion";
      }
      else{
        this.index = this.index  - 1;     
        this.currentQuestion = this.questions[this.index];
        this.control = 'main';  
      }
    }
    this.current = this.index + 1;  
  }

  selectCondition(value) {
    if(this.control == "main") {
      if(!this.fromUser[this.index]) {
        return false;
      }
      else if(this.fromUser[this.index].mainans == value){
        return true;
      }
      else return false;
    }
    else{
      if(!this.fromUser[this.index].subquestion[this.subIndex]) {
        return false;
      }
      else if(this.fromUser[this.index].subquestion[this.subIndex].subAns == value){
        return true;
      }
      else return false;
    }
  }

  executeSubQuestion(subans = '', subvalue = 0){
    var temp = {
      subAns : subans,
      value : (!subvalue) ? "0" : subvalue.toString()
    }
    this.fromUser[this.index].subquestion[this.subIndex] = temp;
    this.subIndex++;
    if(this.subIndex < this.questions[this.index].subQuestionAre.length) {
      this.currentQuestion = this.questions[this.index].subQuestionAre[this.subIndex]
    }
    else if(this.subIndex > 0){
      this.control = "main";
      this.subIndex = 0;
      this.normalFlow();
    }
  }

  normalFlow(){
    this.index = this.index + 1; 
    this.current = this.index + 1; 
    if(this.index <  this.questions.length) {
      this.organiseQuestions();
    }
    else if(this.category_index < this.category_array.length) {
      this.service.saveAns(this.fromUser).subscribe((response)=>{
        console.log(response)
      })
      this.category_index++;
      this.service.getQuestions(this.category_array[this.category_index]).subscribe((questions : any)=>{
        this.questions = questions;
        this.index = 0; 
        this.fromUser.length = 0;
        this.fromUser = [];
        this.current = this.index + 1;
        this.total = this.questions.length;
        this.organiseQuestions();
      })
    }
  }

  async submit(ans, value){
    if(this.control == "subquestion") {
       this.executeSubQuestion(ans, value) 
    }
    else { 
      var temp  = { 
        questionId : this.currentQuestion._id,
        mainans : ans,
        mainScore : value,
        subquestion : []
      }
      if(!this.fromUser[this.index] || this.fromUser.length == 1) {
        this.fromUser[this.index] = temp;
      }
      else{
        this.fromUser[this.index].mainans = ans;
        this.fromUser[this.index].mainScore = value;
      }     
      if(this.questions[this.index].subQuestion == true) {
        if(this.currentQuestion.condition == ans || (ans != "no" && this.currentQuestion.condition == "!no")){
          this.subTotal = this.questions[this.index].subQuestionAre.length;
          this.control = "subquestion";
          this.currentQuestion = this.questions[this.index].subQuestionAre[this.subIndex];
        }
        else{
          this.fromUser[this.index].subquestion = [];
          this.normalFlow();
        }
      }
      else {
        this.fromUser[this.index].subquestion = [];
        this.normalFlow();
      }     
    }
  }
}