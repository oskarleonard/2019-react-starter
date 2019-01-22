import { combineReducers } from 'redux';
import duckHomePage, {
  DUCK_HOME_PAGE_KEY,
} from '@client/pages/homePage/duckHomePage';
import duckNotFoundPage, {
  DUCK_NOT_FOUND_KEY,
} from '@client/pages/notFoundPage/duckNotFoundPage';
import userReducer, { USER_REDUCER_KEY } from './user';

export default function createRootReducer(injectedReducers = {}, initialState) {
  const reducers = {
    [USER_REDUCER_KEY]: userReducer,
    [DUCK_NOT_FOUND_KEY]: duckNotFoundPage,
    [DUCK_HOME_PAGE_KEY]: duckHomePage,
    ...injectedReducers,
  };

  // If initialState contains state we have not loaded the reducer-code for yet,
  // make sure we preserve that state by creating an empty reducer for it
  if (initialState) {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach((initialStateKey) => {
      if (reducerNames.indexOf(initialStateKey) === -1) {
        reducers[initialStateKey] = (state = null) => state;
      }
    });
  }

  return combineReducers(reducers);
}
