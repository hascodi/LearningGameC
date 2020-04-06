import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { parse } from 'querystring';
import { SharedService } from "../shared.service"; //ADDED

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  businessCount: number = 0;
  softwareCount: number = 0;
  securityCount: number = 0;
  iotCount: number = 0;

  message:string; //ADDED
  isShow = false; 
 
  toggleDisplay() {
    if (this.quizService.qnProgress+1 == 3) {
      this.isShow = !this.isShow;
    }
    
  }

  ReturnNumber() {
    return this.quizService.qnProgress+1;
  }
  

  constructor(private router: Router, private quizService: QuizService, private sharedService: SharedService) { } //ADDED sharedservice

  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds')) > 0 ) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
        /*else
        this.startTimer();*/
    }
    else {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data:any)=>{
          this.quizService.qns = data;
        }
      );
    }
    //ADDED
    /*this.quizService.getWeights().subscribe(
      (data:any)=>{
        this.quizService.allWeights = data;
      }
    )*/

    this.sharedService.sharedMessage.subscribe(message => this.message = message) //ADDED
  }

  Answer(qID, choice) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice; //we voegen een extra property answer toe en hierin sla je het antwoord van de gebruiker op
    
    //ADDED
    /*if (this.quizService.qns[this.quizService.qnProgress].answer = 0) {
      this.businessCount = this.businessCount + this.quizService.qns[this.quizService.qnProgress].BUS1;
    }
    else if (this.quizService.qns[this.quizService.qnProgress].answer = 1) {
      this.businessCount = this.businessCount + this.quizService.qns[this.quizService.qnProgress].BUS2;
    }*/
    //this.businessCount = choice;
    if (choice === 0) {
      this.quizService.businessAnswerCount = this.quizService.businessAnswerCount + this.quizService.qns[this.quizService.qnProgress].BUS1;
      //this.businessCount = this.businessCount + this.quizService.qns[this.quizService.qnProgress].BUS1;    
      this.quizService.softwareAnswerCount = this.quizService.softwareAnswerCount + this.quizService.qns[this.quizService.qnProgress].SOF1;
      this.quizService.iotAnswerCount = this.quizService.iotAnswerCount + this.quizService.qns[this.quizService.qnProgress].IOT1;
      this.quizService.securityAnswerCount = this.quizService.securityAnswerCount + this.quizService.qns[this.quizService.qnProgress].CS1;
      // hier de andere 3 profielen toevoegen  
    }
    else if (choice === 1) {
      this.quizService.businessAnswerCount = this.quizService.businessAnswerCount + this.quizService.qns[this.quizService.qnProgress].BUS2;
      this.quizService.softwareAnswerCount = this.quizService.softwareAnswerCount + this.quizService.qns[this.quizService.qnProgress].SOF2;
      this.quizService.iotAnswerCount = this.quizService.iotAnswerCount + this.quizService.qns[this.quizService.qnProgress].IOT2;
      this.quizService.securityAnswerCount = this.quizService.securityAnswerCount + this.quizService.qns[this.quizService.qnProgress].CS2;
      
      // hier de andere 3 profielen toevoegen
    }

    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));//sla lokaal op om bij refresh terug te keren waar je bent gebleven
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());//hetzelde als 2 lijnen hierboven
    /*if (this.quizService.qnProgress == 3) {
      this.router.navigate(['/result']);
    }   */ 
  }  

  GoToLevelTwo() {
    this.router.navigate(['/leveltwee']);
  }

  ShowMeBusinessCount() {
    //return this.businessCount;
    return this.quizService.businessAnswerCount;
  }  

  ShowMeSoftwareCount() {
    return this.quizService.softwareAnswerCount;
  }

  ShowMeSecurityCount() {
    return this.quizService.securityAnswerCount;
  }

  ShowMeIotCount() {
    return this.quizService.iotAnswerCount;
  }

  //ADDED earlier (check de dependencies of ik deze kan verwijderen)
  newMessage() {
    return this.quizService.changeMessage((this.businessCount).toString());
  }

  newMessage2() { //ADDED
    this.sharedService.nextMessage("Second Message")
  }


}
