import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  isVisible = false;
  selectedRadioChoice: string = 'nee'; 
  closeGuideImages = true; 
  selectedGenderChoice: string = 'M'; 
  kellyClicked = false; 
  yvesClicked = false; 

  constructor(private quizService : QuizService, private route : Router) { }

  ngOnInit() {
  }

  

  checkVisibility(valid:boolean) {
    this.isVisible = valid;
  }

  goToQuiz() {
    this.route.navigate(['/quiz']);
  }
}