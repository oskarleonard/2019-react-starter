import { createStore, applyMiddleware, compose } from 'redux';
import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';

export default function configureStore({
  history, // eslint-disable-line
  initialState,
  extraReducers,
}) {
  let middlewares = [thunkMiddleware];
  if (
    process.env.NODE_ENV === `development` &&
    !process.env.SERVER &&
    !window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    const logger = createLogger({
      stateTransformer: (state) => {
        if (Iterable.isIterable(state)) return state.toJS();
        return state;
      },
      collapsed: (getState, action, logEntry) => !logEntry.error,
    });
    middlewares.push(logger);
  }

  const appliedMiddleware = applyMiddleware(...middlewares);

  const injectedReducers = extraReducers || {};
  const rootReducer = createRootReducer(injectedReducers, initialState);

  const composer =
    !process.env.SERVER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    rootReducer,
    initialState,
    composer(appliedMiddleware)
  );

  store.injectReducer = function injectReducer(reducerName, reducer) {
    if (typeof reducerName !== 'string' || typeof reducer !== 'function') {
      throw new Error(
        'Both a valid reducerName and a reducer must be supplied to the injectReducer-function'
      );
    }
    if (!injectedReducers[reducerName]) {
      injectedReducers[reducerName] = reducer;
      const rootReducer = createRootReducer(injectedReducers, initialState);
      store.replaceReducer(rootReducer);
    }
  };

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const createNextRootReducer = require('./reducers').default;
      const nextRootReducer = createNextRootReducer(
        injectedReducers,
        initialState
      );
      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    store,
  };
}
