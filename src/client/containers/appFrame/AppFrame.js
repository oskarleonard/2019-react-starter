import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import routes from '@client/pages/routes';
import { routeWithSubRoutes } from '@client/shared/utils/routerUtils/routerUtils';
import CookieNotification from '@client/components/cookieNotification/CookieNotification';
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
  constructor(props) {
    super(props);
    const acceptCookies = props.cookies.get('acceptCookies');
    this.state = {
      acceptCookies: acceptCookies,
    };
  }

  handleAcceptCookies = () => {
    this.setState(
      () => {
        return {
          acceptCookies: true,
        };
      },
      () => {
        const cookieOptions = {
          path: '/',
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
        };

        this.props.cookies.set('acceptCookies', 'true', cookieOptions);
      }
    );
  };

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
          {!this.state.acceptCookies && (
            <CookieNotification onAcceptCookies={this.handleAcceptCookies} />
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

AppFrame.propTypes = {
  location: PropTypes.object,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withRouter(withCookies(AppFrame));
