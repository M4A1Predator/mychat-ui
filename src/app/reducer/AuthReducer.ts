
import { AuthAction, AuthActionType } from '../auth/AuthAction';

export const initialState = {};

export function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionType.AUTH_LOGIN_SUCCESS: {
      return { ...state, user: action.payload };
    }
  }
}
