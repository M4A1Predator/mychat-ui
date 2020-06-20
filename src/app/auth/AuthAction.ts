import { Action } from '@ngrx/store';
import { User } from '../model/User';

export enum AuthActionType {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED'
}

export class AuthLogin implements Action {
  readonly type = AuthActionType.AUTH_LOGIN;
}

export class AuthLoginSuccess implements Action {
  readonly type = AuthActionType.AUTH_LOGIN_SUCCESS;
  constructor(public payload: User) {
  }
}

export class AuthLoginFailed implements Action {
  readonly type = AuthActionType.AUTH_LOGIN_FAILED;
}

export type AuthAction = AuthLogin | AuthLoginSuccess | AuthLoginFailed;
