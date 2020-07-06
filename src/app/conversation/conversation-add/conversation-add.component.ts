import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import { UserDetail } from 'src/app/model/user-detail';
import { Subscription } from 'rxjs';
import { ConversationsService } from '../conversations.service';
import { CreateConversationResult } from 'src/app/model/create-conversation-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation-add',
  templateUrl: './conversation-add.component.html',
  styleUrls: ['./conversation-add.component.styl']
})
export class ConversationAddComponent implements OnInit, OnDestroy {

  users: UserDetail[];
  private sub: Subscription = new Subscription();

  constructor(private usersService: UsersService,
              private conversationsService: ConversationsService,
              private router: Router) { }

  ngOnInit(): void {
    this.sub.add(this.usersService.getUsersList().subscribe(res => {
      this.users = res;
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChat(userId: string) {
    console.log(userId);
    this.sub.add(
      this.conversationsService.createConversation(userId).subscribe((res: CreateConversationResult) => {
        this.router.navigate(['/conversations', res.conversationId]);
      })
    );
  }

}
