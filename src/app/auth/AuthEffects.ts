import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AuthActionType, AuthLoginFailed, AuthLoginSuccess } from './AuthAction';
import { Credential } from '../model/Credential';
import { User } from '../model/User';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionType.AUTH_LOGIN),
    switchMap((act: any) => {
      return this.authService.login(act.payload).pipe(
        map((user: User) => {
          console.log(user);
          return new AuthLoginSuccess(user);
        }),
        catchError(error => of(new AuthLoginFailed()))
      );
    })
  );
}
