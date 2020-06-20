import { Injectable } from '@angular/core';
import { Credential } from '../model/Credential';
import { User } from '../model/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credential: Credential): Observable<User> {
    const user = new User();
    user.id = 1;
    user.username = 'test';
    return of(user);
  }
}
