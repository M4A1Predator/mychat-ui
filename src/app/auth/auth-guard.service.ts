import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private store: Store<any>,
              private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select('user').pipe(map((user: User) => {
      if (!user) {
        // return false;
        return this.router.parseUrl('/login');
      }
      if (user.accessToken) {
        return true;
      }
      return this.router.parseUrl('/login');
    }));
  }

}
