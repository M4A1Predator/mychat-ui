import { Action } from '@ngrx/store';
import { User } from '../model/User';
import { Credential } from '../model/Credential';

export enum AuthActionType {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS',
}

export class AuthLogin implements Action {
  readonly type = AuthActionType.AUTH_LOGIN;
  constructor(public payload: Credential){}
}

export class AuthLoginSuccess implements Action {
  readonly type = AuthActionType.AUTH_LOGIN_SUCCESS;
  constructor(public payload: User) {
  }
}

export class AuthLoginFailed implements Action {
  readonly type = AuthActionType.AUTH_LOGIN_FAILED;
}

export class AuthLogout implements Action {
  readonly type = AuthActionType.AUTH_LOGOUT;
}

export class AuthLogoutSuccess implements Action {
  readonly type = AuthActionType.AUTH_LOGOUT_SUCCESS;
}

export type AuthAction = AuthLogin | AuthLoginSuccess | AuthLoginFailed
                        | AuthLogout | AuthLogoutSuccess;
