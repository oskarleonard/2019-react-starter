import { fromJS } from 'immutable';
import { valIn } from '@client/shared/utils/immutableUtils/immutableUtils';

export const USER_REDUCER_KEY = 'userReducer';

export const RESET_USER_REDUCER = 'RESET_USER_REDUCER';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const LOAD_LOGIN = 'LOAD_LOGIN';
export const LOAD_PROFILE = 'LOAD_PROFILE';
export const LOAD_LOGIN_ERROR = 'LOAD_LOGIN_ERROR';
export const LOAD_PROFILE_ERROR = 'LOAD_PROFILE_ERROR';

let defaultState = fromJS({
  accessToken: null,
  user: null,
  errors: {
    loginError: null,
    profileError: null,
  },
});

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_LOGIN: {
      return state.merge({
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        errors: state.setIn(['errors', 'loginError'], null),
      });
    }
    case LOAD_LOGIN_ERROR: {
      return state.setIn(['errors', 'loginError'], action.error);
    }
    case LOAD_PROFILE: {
      return state.merge({
        user: action.payload.user,
        errors: state.setIn(['errors', 'loginProfile'], null),
      });
    }
    case SET_ACCESS_TOKEN: {
      return state.set('accessToken', action.payload);
    }
    case RESET_USER_REDUCER: {
      return defaultState;
    }
    default:
      return state;
  }
}

export const selectAccessToken = (state) => {
  return valIn(state[USER_REDUCER_KEY], 'accessToken');
};

export const selectUser = (state) => {
  return valIn(state[USER_REDUCER_KEY], 'user');
};

export const selectUserName = (state) => {
  return valIn(selectUser(state), 'name');
};

export const selectError = (state) => {
  return valIn(state[USER_REDUCER_KEY], 'errors');
};

export const selectLoginError = (state) => {
  return valIn(selectError(state), 'loginError');
};
