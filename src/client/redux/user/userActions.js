import { postLogin, getProfile } from '@client/connectivity/api.users';
import {
  RESET_USER_REDUCER,
  SET_ACCESS_TOKEN,
  LOAD_LOGIN,
  LOAD_PROFILE_ERROR,
  LOAD_PROFILE,
  LOAD_LOGIN_ERROR,
  selectAccessToken,
} from './userReducer';

export function loadLogin(username, password, cookies) {
  return function(dispatch) {
    return postLogin(username, password)
      .then((response) => {
        const accessToken = response.data.accessToken;
        const cookieOptions = { path: '/', expires: 0 };
        cookies.set('accessToken', accessToken, cookieOptions);

        return dispatch({
          type: LOAD_LOGIN,
          payload: response.data,
        });
      })
      .catch((error) => {
        const message = (error && error.message) || error.toString();
        return dispatch({
          type: LOAD_LOGIN_ERROR,
          error: `Load login error: ${message}`,
        });
      });
  };
}

export function loadProfile() {
  return function(dispatch, getState) {
    const accessToken = selectAccessToken(getState());
    return getProfile(accessToken)
      .then((response) => {
        return dispatch({
          type: LOAD_PROFILE,
          payload: response.data,
        });
      })
      .catch((error) => {
        const message = (error && error.message) || error.toString();
        return dispatch({
          type: LOAD_PROFILE_ERROR,
          error: `Load profile error: ${message}`,
        });
      });
  };
}

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    payload: accessToken,
  };
}

export function resetUserReducer() {
  return {
    type: RESET_USER_REDUCER,
  };
}
