import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { Helmet } from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import LazyLoadContext from '@client/helperComponents/context/LazyLoadContext';
import asyncReducers from '@client/redux/asyncReducers';
import configureStore from '../client/redux/configureStore';
import AppFrame from '../client/containers/appFrame/AppFrame';
import { getHtml } from './views/htmlHelpers';
import { preloadRouteData, preloadDataErrorHandler } from './renderUtils';

export default ({ clientStats }) => (req, res) => {
  const history = createMemoryHistory({ initialEntries: [req.path] });
  const { store } = configureStore({ history, extraReducers: asyncReducers });
  const lazyLoadContextValue = {
    injectReducer: store.injectReducer,
  };

  const routerContext = {};
  const ServerApp = () => (
    <LazyLoadContext.Provider value={lazyLoadContextValue}>
      <CookiesProvider cookies={req.universalCookies}>
        <Provider store={store} key="provider">
          <StaticRouter location={req.url} context={routerContext}>
            <AppFrame />
          </StaticRouter>
        </Provider>
      </CookiesProvider>
    </LazyLoadContext.Provider>
  );

  preloadRouteData(req, store)
    .then(() => {
      const reactDomString = ReactDOMServer.renderToString(<ServerApp />);
      if (routerContext.url) {
        const status =
          (routerContext.location && routerContext.location.status) || 302;
        return res.redirect(status, routerContext.url);
      } else {
        switch (routerContext.status) {
          case 302:
            res.status(routerContext.status);
            res.location(routerContext.url);
            res.end();
            break;
          default: {
            const chunkNames = flushChunkNames();
            const { styles, js, cssHash } = flushChunks(clientStats, {
              chunkNames,
            });
            let stateJson = JSON.stringify(store.getState());
            const helmet = Helmet.renderStatic();
            res.status(routerContext.status || 200).send(
              getHtml({
                stateJson,
                js,
                cssHash,
                styles,
                reactDomString,
                helmet,
              })
            );
          }
        }
      }
    })
    .catch((err) => {
      preloadDataErrorHandler(err, res, req);
    });
};
