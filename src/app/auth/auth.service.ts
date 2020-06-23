import { Injectable } from '@angular/core';
import { Credential } from '../model/Credential';
import { User } from '../model/User';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { JwtDetail } from '../model/jwt-detail';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<any>,
              private http: HttpClient) { }

  login(credential: Credential): Observable<User> {
    // const user = new User();
    // user.id = '1';
    // user.username = 'test';
    // return of(user);
    const data = {
      username: credential.username,
      password: credential.password
    };
    const user = new User();
    return this.http.post(environment.API_URL + 'user/login', data).pipe(map((jwt: JwtDetail) => {
        user.accessToken = jwt.jwtToken;
        return user;
      }),
      catchError(err => { console.error(err); throw err; }))
    .pipe(mergeMap(u => {
        const options = {
          headers : this.getHeader(u)
        };
        return this.http.get(`${environment.API_URL}user/session`, options).pipe(map(i => i));
      }),
      catchError(err => { console.error(err); throw err; })
    )
    .pipe(map((info: any) => {
      user.id = info.userId;
      user.username = info.username;
      return user;
    }));
  }

  getHeader(user: User) {
    return {
      Authorization: `Bearer ${user.accessToken}`
    } as any;
  }
}
