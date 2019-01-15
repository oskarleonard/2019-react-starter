import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import history from '@client/shared/utils/history';
import { CookiesProvider } from 'react-cookie';
import LazyLoadContext from '@client/helperComponents/context/LazyLoadContext';
import configureStore from './redux/configureStore';
import AppFrame from './containers/appFrame/AppFrame';
import 'shared/styles/base.scss';

let initialState = {};
if (typeof window === 'object' && window.__SERVER_STATE__) {
  try {
    let plain = window.__SERVER_STATE__;
    for (const key in plain) {
      if (key !== 'router' && key !== 'toastr') {
        initialState[key] = Immutable.fromJS(plain[key]);
      }
    }
  } catch (error) {
    console.error('__SERVER_STATE__ error', error.toString());
  }
}

const { store } = configureStore({
  initialState,
  history,
});

// Scroll to top on history change
history.listen(() => {
  if (typeof window === 'object') {
    window.scrollTo(0, 0);
  }
});

const lazyLoadContextValue = {
  injectReducer: store.injectReducer,
};

const supportsHistory = 'pushState' in window.history;

const renderApp = (AppFrame) => {
  hydrate(
    <AppContainer>
      <LazyLoadContext.Provider value={lazyLoadContextValue}>
        <Provider store={store}>
          <BrowserRouter forceRefresh={!supportsHistory}>
            <CookiesProvider>
              <AppFrame />
            </CookiesProvider>
          </BrowserRouter>
        </Provider>
      </LazyLoadContext.Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(AppFrame);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/appFrame/AppFrame.js', () => {
    const App = require('./containers/appFrame/AppFrame').default; // eslint-ignore-line
    renderApp(App);
  });
}
