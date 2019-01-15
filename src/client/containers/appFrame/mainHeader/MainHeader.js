import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import themeStyles from '@client/shared/styles/theme/theme-styles.scss';
import styles from './mainHeader.scss';

class MainHeader extends PureComponent {
  render() {
    const { isExpanded } = this.props;
    return (
      <header className={styles.mainHeader}>
        <div className={styles.stickyHeader}>
          <i
            className={`${themeStyles.iconHamburger} ${
              styles.navBarButtonIcon
            }`}
          />
        </div>
      </header>
    );
  }
}

MainHeader.propTypes = {
  isExpanded: PropTypes.bool,
};

export default withRouter(MainHeader);
