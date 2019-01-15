import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch, withRouter } from 'react-router-dom';
import routes from '@client/pages/routes';
import { routeWithSubRoutes } from '@client/shared/utils/routerUtils/routerUtils';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import MainHeader from './mainHeader/MainHeader';
import styles from './appFrame.scss';

const MainRouteSwitch = withRouter(
  React.memo(() => {
    function getMainClassName() {
      return classNames({
        [styles.main]: true,
      });
    }

    return (
      <main className={getMainClassName()}>
        <Switch>
          {routes.map((route, index) => routeWithSubRoutes(route, index))}
        </Switch>
      </main>
    );
  })
);

class AppFrame extends PureComponent {
  render() {
    return (
      <ErrorBoundary>
        <div className={styles.appFrame} id="app-container">
          <Helmet title="React Starter" />
          <MainHeader />
          <div
            className={styles.mainContentBelowHeader}
            id="content-below-header"
          >
            <MainRouteSwitch />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

AppFrame.propTypes = {
  location: PropTypes.object,
};

export default withRouter(AppFrame);
