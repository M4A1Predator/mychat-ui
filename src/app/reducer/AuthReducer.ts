
import { AuthAction, AuthActionType } from '../auth/AuthAction';
import { User } from '../model/User';

export const initialState = new User();

export function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionType.AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case AuthActionType.AUTH_LOGOUT_SUCCESS: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
}
