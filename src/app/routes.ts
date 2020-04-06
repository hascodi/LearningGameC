import {Routes} from '@angular/router'
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { SharedService } from './shared.service';
import { LeveltweeComponent } from './leveltwee/leveltwee.component';

export const appRoutes : Routes = [
    {path: 'register', component:RegisterComponent},
    {path: 'quiz', component:QuizComponent},
    {path: 'result', component:ResultComponent},
    {path: '', redirectTo:'/register', pathMatch:'full'},
    {path: 'leveltwee', component:LeveltweeComponent}//ADDED
];