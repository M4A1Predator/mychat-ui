import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { ConversationListComponent } from './conversation/conversation-list/conversation-list.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ConversationDetailComponent } from './conversation/conversation-detail/conversation-detail.component';
import { ConversationsService } from './conversation/conversations.service';
import { ConversationAddComponent } from './conversation/conversation-add/conversation-add.component';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'conversations', component: ConversationListComponent, canActivate: [AuthGuardService] },
  { path: 'conversations/new', component: ConversationAddComponent, canActivate: [AuthGuardService], pathMatch: 'full' },
  { path: 'conversations/:conversationId', component: ConversationDetailComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
