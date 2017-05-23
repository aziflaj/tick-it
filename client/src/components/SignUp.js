import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { apiCall } from '../helpers/api';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      full_name: '',
      disabled: false,
      errorMessage: ''
    };
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onFullNameChange(e) {
    this.setState({ full_name: e.target.value });
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.setState({ disabled: true });
    const data = {
      full_name: this.state.full_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    apiCall('users', 'post', data, false).then(response => {
      if (response.data.status === 'ok') {
        alert('You should login now');
        this.context.router.history.push('/');
      } else {
        this.setState({
          errorMessage: response.data.message,
          disabled: false
        });
      }
    });
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      const user = JSON.parse(localStorage.getItem('user'));
      const username = user.username;
      this.context.router.history.push(`/users/${username}`);
    }
  }

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form className="register-form" onSubmit={this.onFormSubmit.bind(this)}>
            <label htmlFor="inputFullName" className="sr-only">Full Name</label>
            <input type="text"
              placeholder="Full Name"
              required
              autoFocus
              onChange={this.onFullNameChange.bind(this)}
              />

            <label htmlFor="inputUsername" className="sr-only">Username</label>
            <input type="text"
              placeholder="Username"
              required
              autoFocus
              onChange={this.onUsernameChange.bind(this)}
              />

            <label htmlFor="inputEmail" className="sr-only">E-Mail</label>
            <input type="text"
              placeholder="E-Mail"
              required
              autoFocus
              onChange={this.onEmailChange.bind(this)}
              />

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password"
              placeholder="Password"
              onChange={this.onPasswordChange.bind(this)}
              required
              />

            <button type="submit" disabled={this.state.disabled}>Register</button>
            <p className="message">Already registered? <Link to='/'>Sign in</Link></p>
          </form>
        </div>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignUp;
