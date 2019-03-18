import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Cookies, withCookies } from 'react-cookie';
import { getIn } from '@client/shared/utils/immutableUtils/immutableUtils';
import GenericHelmet from '@client/helperComponents/genericHelmet/GenericHelmet';
import themeStyles from '@client/shared/styles/theme/theme-styles.scss';
import { resetUserReducer, selectUser } from '@client/redux/user';
import {
  loadHomePageContent,
  selectText,
  selectHelmetData,
} from './duckHomePage';
import styles from './homePage.scss';

class HomePage extends PureComponent {
  static loadData(dispatch) {
    return dispatch(loadHomePageContent());
  }

  componentDidMount() {
    HomePage.loadData(this.props.dispatch);
  }

  onLogout = (event) => {
    const { dispatch, cookies } = this.props;

    dispatch(resetUserReducer(cookies));

    event.preventDefault();
  };

  render() {
    const { text, helmetData, user } = this.props;

    return (
      <div className={styles.homeRoute}>
        <p>{text}</p>
        <i className={themeStyles.iconHome} />
        <GenericHelmet helmetData={helmetData} />
        {user && (
          <div>
            <div>{getIn(user, 'firstName')}</div>
            <div>{getIn(user, 'lastName')}</div>
          </div>
        )}
        {user && (
          <div>
            <br />
            <button onClick={this.onLogout}>LOGOUT</button>
          </div>
        )}
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func,
  text: PropTypes.string,
  helmetData: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

function mapStateToProps(state) {
  return {
    text: selectText(state),
    helmetData: selectHelmetData(state),
    user: selectUser(state),
  };
}

export default connect(mapStateToProps)(withCookies(HomePage));
