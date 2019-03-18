import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import GenericHelmet from '@client/helperComponents/genericHelmet/GenericHelmet';
import LoginForm from '@client/pages/loginPage/loginForm/LoginForm';
import styles from './styles.scss';

const signUpMockData = fromJS({
  helmetData: {
    title: 'Login',
    meta: [
      {
        name: 'description',
        content: 'Login to ...',
      },
    ],
  },
});

class LoginPage extends PureComponent {
  render() {
    return (
      <div className={styles.loginPage}>
        <LoginForm />
        <p>{signUpMockData.get('text')} </p>
        <GenericHelmet helmetData={signUpMockData.get('helmetData')} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(LoginPage);
