import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConversationsService } from '../conversations.service';
import { Conversation } from 'src/app/model/Conversation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.styl']
})
export class ConversationListComponent implements OnInit, OnDestroy {

  constructor(private conversationsService: ConversationsService) { }

  subs: Subscription[] = [];
  conversations: Conversation[] = [];

  ngOnInit(): void {
    this.subs.push(this.conversationsService.getConversations().subscribe(res => {
      this.conversations = res;
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

  getRoomName(con: Conversation): string {
    return con.users.map(u => u.username).join(', ');
  }
}
