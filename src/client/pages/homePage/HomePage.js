import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { getIn } from '@client/shared/utils/immutableUtils/immutableUtils';
import GenericHelmet from '@client/helperComponents/genericHelmet/GenericHelmet';
import themeStyles from '@client/shared/styles/theme/theme-styles.scss';
import { selectUser } from '@client/redux/user';
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
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func,
  text: PropTypes.string,
  helmetData: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

function mapStateToProps(state) {
  return {
    text: selectText(state),
    helmetData: selectHelmetData(state),
    user: selectUser(state),
  };
}

export default connect(mapStateToProps)(HomePage);
