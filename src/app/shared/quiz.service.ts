import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getTestBed } from '@angular/core/testing';
import { Subject, Observable } from 'rxjs'; 
import { BehaviorSubject } from 'rxjs'; //ADDED

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  //ADDED --> mag dit weg?
  private myMessage = new Subject<any>();

  private messageSource = new BehaviorSubject<string>("default message"); //ADDED
  currentMessage = this.messageSource.asObservable(); //ADDED

  //From this QuizService class I will consume the web API methods

  //properties------------------------------------------------------
  //readonly rootUrl = 'http://localhost:61073/';
  readonly rootUrl = 'https://learninggame.azurewebsites.net';
  //some properties to save the questions----------
  qns: any[];
  seconds: number;
  qnProgress: number;
  timer;
  allWeights: any[];
  softwareAnswerCount: number = 0;
  businessAnswerCount: number = 0;
  securityAnswerCount: number = 0;
  iotAnswerCount: number = 0; 
  correnctAnswerCount: number = 0;

  
  
  /*avatars = ["/assets/img/avatars/avatar1.png", "/assets/img/avatars/avatar2.png", 
            "/assets/img/avatars/avatar3.png", "/assets/img/avatars/avatar4.png"];*/

  trophies = ["/assets/img/trophies/trophy1.png", "/assets/img/trophies/trophy2.png",
            "/assets/img/trophies/trophy3.png", "/assets/img/trophies/trophy4.png"];

  



  // helper methods------------------------------------------
  constructor(private http : HttpClient) { }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }


  // http methods--------------------------------------------

  insertParticipant(email: string) {
    var body = {
      Email: email
    }
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }

  getQuestions() {
    return this.http.get(this.rootUrl + '/api/Questions');
  }

  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  //ADDED
  /*getWeights()
  {
    //hier mss nog mappen zoal hierboven bij getAnwsers??????
    return this.http.get(this.rootUrl + '/api/Questions');
  }*/

  

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    //body.Score = this.softwareAnswerCount;//DIT IS TIJDELIJK
    body.Score = this.correnctAnswerCount;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }

  //8 functies om de gewichten te bekomen (todo)
  getWeightB1() {
    var b1 = JSON.parse(localStorage.getItem('question'));
    return b1.B;
  }


  //other methods---------------------------------------

  

  

  getRandomTrophy() {
    return this.trophies[Math.floor(Math.random()*this.trophies.length)];
  }

  //ADDED
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
