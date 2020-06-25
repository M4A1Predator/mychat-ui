import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
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
export class ConversationDetailComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();

  conversationId: string;
  stompClient: any;

  message = '';
  oldMessages: Message[];
  conversationUsers: UserDetail[];

  @ViewChild('chat') chatEl: ElementRef;

  constructor(private route: ActivatedRoute,
              private store: Store<any>,
              private conversationsService: ConversationsService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    // this.sub.add(this.route.paramMap.subscribe(pm => {
    //   this.conversationId = pm.get('conversationId');
    //   this.connect(this.conversationId);
    // }));
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
        this.conversationsService.getConversationUsers(this.conversationId).subscribe((users: UserDetail[]) => {

        });

        return this.conversationsService.getOldMessages(this.conversationId, 0);
      }))
      .subscribe(messages => {
        this.oldMessages = messages;
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
      this.stompClient = Stomp.over(sock);
      const header = {
        Authorization: `Bearer ${user.accessToken}`,
        conversationId: this.conversationId
      };
      this.stompClient.connect(header, (frame) => {
        console.log('Connected: ' + frame);
        this.stompClient.subscribe('/user/topic/chat', (greeting) => {
          const message: Message = JSON.parse(greeting.body);
          const d = this.renderer.createElement('div');
          const t = this.renderer.createText(message.body);
          this.renderer.appendChild(d, t);
          this.renderer.appendChild(this.chatEl.nativeElement, d);
        });
      });
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  send() {
    const data = {
      body: this.message,
      conversationId : this.conversationId
    };
    this.stompClient.send('/app/send', {}, JSON.stringify(data));
  }

}
