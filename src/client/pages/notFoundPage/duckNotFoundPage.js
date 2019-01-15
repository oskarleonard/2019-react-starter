import Immutable from 'immutable';
import { fetchPageContent } from '@client/connectivity/api.pages';
import { valIn } from '@client/shared/utils/immutableUtils/immutableUtils';

export const DUCK_NOT_FOUND_KEY = 'duckNotFoundReducer';

const LOAD_DUCK_NOT_FOUND = 'LOAD_DUCK_NOT_FOUND';
const SET_HOME_PAGE_ERROR = 'SET_HOME_PAGE_ERROR';

/* REDUCER */
let defaultState = Immutable.fromJS({
  pageContent: {
    text: null,
    helmetData: null,
  },
});

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_DUCK_NOT_FOUND: {
      return state.merge({ pageContent: action.payload, errorMessage: '' });
    }
    case SET_HOME_PAGE_ERROR: {
      return state.merge({
        errorMessage: action.payload,
      });
    }
    default:
      return state;
  }
}

/* ACTIONS */
function setHomePageError(dispatch, errorMessage) {
  return dispatch({
    type: SET_HOME_PAGE_ERROR,
    payload: errorMessage,
  });
}

export function loadNotFoundPageContent() {
  return function(dispatch) {
    return fetchPageContent('/notFound')
      .then((response) => {
        const payload = response.data;
        return dispatch({
          type: LOAD_DUCK_NOT_FOUND,
          payload: payload,
        });
      })
      .catch((error) => {
        return setHomePageError(
          dispatch,
          error && error.toString && error.toString()
        );
      });
  };
}

/* SELECTORS */
export const selectNotFoundData = (state) => {
  return valIn(state[DUCK_NOT_FOUND_KEY], 'pageContent');
};

export const selectText = (state) => {
  return valIn(selectNotFoundData(state), 'text');
};

export const selectHelmetData = (state) => {
  return valIn(selectNotFoundData(state), 'helmetData');
};
