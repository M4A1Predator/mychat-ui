import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Conversation } from '../model/Conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  constructor(private http: HttpClient,
              private store: Store<any>,
              private authService: AuthService) { }

  public getConversations(): Observable<any> {
    return this.store.select('user').pipe(mergeMap(state => {
      const options = {
        headers : this.authService.getHeader(state.user)
      };
      return this.http.get(environment.API_URL + 'conversations', options).pipe(map((c: Conversation[]) => c));
    }));
  }
}
