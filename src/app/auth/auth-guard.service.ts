import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private store: Store<any>) { }

  canActivate(): Observable<boolean> {
    return this.store.select('user').pipe(map((state: any) => {
      console.log(state)
      if (!state || !state.user) {
        return false;
      }
      return !!state.user.accessToken;
    }));
  }

}
