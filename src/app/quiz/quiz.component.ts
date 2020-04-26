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
  isShow:boolean = false; 
  isShowVragen:boolean = false;
  clikTeller = 0;
 
  toggleDisplay() {
    /*if (this.quizService.qnProgress == 2) {
      this.isShow = !this.isShow;
      //this.isShowVragen = true;
    }*/

    if (this.quizService.qnProgress == 10) {
      //this.isShow = !this.isShow;
      this.isShowVragen = true;
    }    
  }

  ReturnNumber() { //temp
    return this.quizService.qnProgress+1;
  }

  ReturnShowVarNext() { //temp
    return this.isShow;
  }

  ReturnShowVarVragen () {
    return this.isShowVragen;
  }


  

  constructor(private router: Router, private quizService: QuizService, private sharedService: SharedService) { } //ADDED sharedservice

  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds')) > 0 ) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      /*if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);*/
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
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));//sla lokaal op om bij refresh terug te keren waar je bent gebleven
    this.quizService.qnProgress++;//deze is belangrijk en moet blijven staan
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
