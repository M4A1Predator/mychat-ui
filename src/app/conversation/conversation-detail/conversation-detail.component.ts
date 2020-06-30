import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  TemplateRef, ViewContainerRef, AfterViewChecked
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/User';
import { Subscription } from 'rxjs';
import { ConversationsService } from '../conversations.service';
import { map, mergeMap } from 'rxjs/operators';
import { Message } from 'src/app/model/message';
import { UserDetail } from 'src/app/model/user-detail';

declare var SockJS;
declare var Stomp;

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.styl']
})
export class ConversationDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  sub: Subscription = new Subscription();

  conversationId: string;
  stompClient: any;

  message = '';
  oldMessages: Message[] = [];
  conversationUsers: { [key: string]: UserDetail } = {};

  private userId = '';

  private needUpdateScroll = false;

  @ViewChild('chat') chatEl: ElementRef;

  @ViewChild('newMsg') newMsg: TemplateRef<any>;

  @ViewChild('chatMessage') chatMessage: ElementRef;

  constructor(private route: ActivatedRoute,
              private store: Store<any>,
              private conversationsService: ConversationsService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.pipe(map(pm => {
        this.conversationId = pm.get('conversationId');
        return this.conversationId;
      }))
        .pipe(map(conId => {
          this.connect(this.conversationId);
          return this.conversationId;
        }))
        .pipe(mergeMap(conId => {
          this.sub.add(this.conversationsService.getConversationUsers(this.conversationId).subscribe((users: UserDetail[]) => {
            this.conversationUsers = {};
            users.forEach(u => {
              this.conversationUsers[u.userId] = u;
            });
          }));

          return this.conversationsService.getOldMessages(this.conversationId, 0);
        }))
        .subscribe(messages => {
          this.oldMessages = messages;
          setTimeout(() => this.scrollChat(), 250);
        })
    );
  }

  connect(conId: string) {
    const sock = new SockJS(`${environment.API_URL}websocket?conId=${conId}`);
    sock.onopen = () => {
      console.log('open');
      sock.send('test');
    };

    sock.onmessage = (e) => {
      console.log('message', e.data);
      sock.close();
    };

    sock.onclose = () => {
      console.log('close');
    };

    this.store.select('user').subscribe((user: User) => {
      this.userId = user.id;
      this.stompClient = Stomp.over(sock);
      const header = {
        Authorization: `Bearer ${user.accessToken}`,
        conversationId: this.conversationId
      };
      this.stompClient.connect(header, (frame) => {
        console.log('Connected: ' + frame);
        this.stompClient.subscribe('/user/topic/chat', (greeting) => {
          const message: Message = JSON.parse(greeting.body);
          // const d = this.renderer.createElement('div');
          // const t = this.renderer.createText(this.getUserName(message.from) + ' : ' + message.body);
          // this.renderer.appendChild(d, t);
          // this.renderer.appendChild(this.chatEl.nativeElement, d);
          this.oldMessages.push(message);
          this.needUpdateScroll = true;
        });
      });
    });

  }

  ngOnDestroy() {
    this.stompClient.disconnect();
    this.sub.unsubscribe();
  }

  ngAfterViewChecked() {
    if (this.needUpdateScroll) {
      this.scrollChat();
    }
  }

  send() {
    if (!this.message.length) {
      return;
    }
    const data = {
      body: this.message,
      conversationId: this.conversationId
    };
    this.stompClient.send('/app/send', {}, JSON.stringify(data));
  }

  getUserName(userId: string) {
    const u = this.conversationUsers[userId];
    return u && u.username;
  }

  scrollChat() {
    this.chatEl.nativeElement.scrollTop = this.chatEl.nativeElement.scrollHeight;
  }

  isMessageOwner(fromId: string) {
    return this.userId === fromId;
  }

  onEnterChat() {
    this.send();
    this.message = '';
  }

}
