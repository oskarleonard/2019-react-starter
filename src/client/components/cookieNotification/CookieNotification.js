import ReactLink from '@client/components/reactLink/ReactLink';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import themeStyles from '@client/shared/styles/theme/theme-styles.scss';
import styles from './styles.scss';

class CookieNotification extends PureComponent {
  render() {
    const { className } = this.props;

    return (
      <div
        className={`${styles.cookieNotification}${
          className ? ` ${className}` : ''
        }`}
      >
        <span className={themeStyles.darkSpan}>CLICK&nbsp;</span>
        <span
          className={`${themeStyles.darkSpan} ${styles.acceptBtn}`}
          onClick={this.props.onAcceptCookies}
        >
          HERE
        </span>
        <span className={themeStyles.darkSpan}>&nbsp;TO ACCEPT&nbsp;</span>
        <ReactLink
          className={`${themeStyles.darkSpan} ${styles.acceptBtn}`}
          to={'/cookie-policy'}
        >
          COOKIES?
        </ReactLink>
      </div>
    );
  }
}

CookieNotification.propTypes = {
  className: PropTypes.string,
  onAcceptCookies: PropTypes.func,
};

export default CookieNotification;
