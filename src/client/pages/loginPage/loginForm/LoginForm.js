import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Cookies, withCookies } from 'react-cookie';
import { loadLogin } from '@client/redux/user';
import { selectLoginError } from '@client/redux/user/userReducer';
import styles from './styles.scss';

const INITIAL_STATE = {
  email: '',
  password: '',
};

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    const { dispatch, history, cookies } = this.props;

    dispatch(loadLogin(email, password, cookies)).then((res) => {
      if (res && !res.error) {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push('/');
      }
    });

    event.preventDefault();
  };

  handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (event.target.type === 'password') {
      this.setState(() => {
        return {
          password: inputValue,
        };
      });
    } else {
      this.setState(() => {
        return {
          email: inputValue,
        };
      });
    }
  };

  render() {
    const { email, password } = this.state;
    const { loginError } = this.props;

    const isInvalid = password === '' || email === '';

    return (
      <form className={styles.loginForm} onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={this.handleInputChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={this.handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {loginError && <p>{loginError}</p>}
      </form>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  loginError: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    loginError: selectLoginError(state),
  };
}

export default connect(mapStateToProps)(withRouter(withCookies(LoginForm)));
