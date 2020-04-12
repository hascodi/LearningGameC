import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leveltwee',
  templateUrl: './leveltwee.component.html',
  styleUrls: ['./leveltwee.component.css']
})
export class LeveltweeComponent implements OnInit {

  isShow = false; 
  stap1 = true;
  stap2 = false;
  stap3 = false;
  progressTeller = 20;


  /*toggleDisplay() {
    if (this.quizService.qnProgress+1 == 3) {
      this.isShow = !this.isShow;
    }
    
  }*/

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    /*if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);*/
  }

  GoToStep2() {
    this.stap2 = !this.stap2;
    this.stap1 = !this.stap1;
    this.stap3 = false;
    window.scroll(0,0);
  }

  GoToStep3() {
    this.stap2 = !this.stap2;
    this.stap1 = false;
    this.stap3 = !this.stap3;
    window.scroll(0,0);
  }

  GoToOverview() {
    this.router.navigate(['/result']);
  }

  VerhoogProgressTeller() {
    this.progressTeller += 20;
  }

}
