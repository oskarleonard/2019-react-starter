import { fetchPageContent } from '@client/connectivity/api.pages';
import Immutable from 'immutable';
import { valIn } from '@client/shared/utils/immutableUtils/immutableUtils';

export const DUCK_HOME_PAGE_KEY = 'duckHomePageReducer';

const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';
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
    case LOAD_HOME_PAGE: {
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

export function loadHomePageContent() {
  return function(dispatch) {
    return fetchPageContent('/home')
      .then((response) => {
        const payload = response.data;
        return dispatch({
          type: LOAD_HOME_PAGE,
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
export const selectHomePageData = (state) => {
  return valIn(state[DUCK_HOME_PAGE_KEY], 'pageContent');
};

export const selectText = (state) => {
  return valIn(selectHomePageData(state), 'text');
};

export const selectHelmetData = (state) => {
  return valIn(selectHomePageData(state), 'helmetData');
};
