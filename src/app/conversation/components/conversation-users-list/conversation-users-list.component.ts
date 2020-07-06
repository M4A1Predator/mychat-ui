import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserDetail } from 'src/app/model/user-detail';


@Component({
  selector: 'app-conversation-users-list',
  templateUrl: './conversation-users-list.component.html',
  styleUrls: ['./conversation-users-list.component.styl']
})
export class ConversationUsersListComponent implements OnInit {

  @Input()
  users: UserDetail[] = [];

  @Output()
  chat: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  clickChat(id: string) {
    this.chat.emit(id);
  }

}
