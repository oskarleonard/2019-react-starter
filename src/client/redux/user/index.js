import userReducer, {
  USER_REDUCER_KEY,
  selectAccessToken,
  selectUser,
  selectUserName,
} from './userReducer';
import {
  setAccessToken,
  loadLogin,
  loadProfile,
  resetUserReducer,
} from './userActions';

export {
  USER_REDUCER_KEY,
  setAccessToken,
  loadLogin,
  loadProfile,
  resetUserReducer,
  selectAccessToken,
  selectUser,
  selectUserName,
};

export default userReducer;
