import { Component, OnInit, ViewChild} from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { stringify } from 'querystring';
import { QuizComponent } from '../quiz/quiz.component';
import { SharedService } from "../shared.service"; //ADDED


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  message:string;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private router: Router, private quizService: QuizService, private quizComponent: QuizComponent, private sharedService: SharedService) { //ADDED sharedService
  }

  ngOnInit() {

    //this.quizService.currentMessage.subscribe(message => this.message = message) //ADDED earlier

    this.sharedService.sharedMessage.subscribe(message => this.message = message) //ADDED

    this.quizService.getAnswers().subscribe(
      (data : any) =>{
        //this.quizService.softwareAnswerCount = 0;
        //this.quizService.businessAnswerCount = 0;
        //this.quizService.securityAnswerCount = 0;
        //this.quizService.iotAnswerCount = 0;
        this.quizService.correnctAnswerCount = 0;
        this.quizService.qns.forEach((e,i)=>{
          if(e.answer == data[i])//vergelijk het gekozen antwoord met het juiste antwoord
          //this.quizService.softwareAnswerCount++;//DIT IS TIJDELIJK
          this.quizService.correnctAnswerCount++;
          e.correct = data[i];
          
          /*if(e.answer == 1)
          {
            this.quizService.softwareAnswerCount +=
          }*/
        });
      }
    );     
  }

  /*OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
      this.restart();
    });
  }*/

  OnSubmit(email:string){
    this.quizService.insertParticipant(email).subscribe(
      (data : any) =>{
        localStorage.clear();
        localStorage.setItem('participant',JSON.stringify(data));
        //this.router.navigate(['/quiz']);
      }
    );
  }

  restart() {
    this.router.navigate(['/quiz']);
  }

  goToGateKeeper() {
    this.router.navigate(['/gatekeeper']);
  }

  goToPioneer() {
    this.router.navigate(['/pioneer']);
  }

  goToCreator() {
    this.router.navigate(['/creator']);
  }

  goToBridgeBuilder() {
    this.router.navigate(['/bridgebuilder']);
  }
}