import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { apiCall } from '../helpers/api';
import { showLoading, hideLoading } from '../helpers';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      disabled: false,
      errorMessage: ''
    };
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.setState({ disabled: true });
    showLoading();
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    apiCall('authenticate', 'post', data, false).then(response => {
      hideLoading();
      if (response.data.status === 'ok') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        apiCall(`notifications/count`, 'get').then(response => {
          localStorage.setItem('notifications', response.data.unread);
          this.context.router.history.push(`/users/${this.state.username}`);
        });
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
      <form className="form-signin" onSubmit={this.onFormSubmit.bind(this)}>
        <p className="bg-danger">{this.state.errorMessage}</p>
        <h2 className="form-signin-heading">Please sign in</h2>
        <label htmlFor="inputEmail" className="sr-only">Username</label>
        <input id="inputEmail"
               type="text"
               className="form-control"
               placeholder="Username"
               required
               autoFocus
               onChange={this.onUsernameChange.bind(this)}
        />

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password"
               id="inputPassword"
               className="form-control"
               placeholder="Password"
               onChange={this.onPasswordChange.bind(this)}
               required
        />

        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>

        <div>
          Don't have an account?
          <Link to='/signup'>Sign up</Link>
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={this.state.disabled}>Sign in</button>
      </form>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Login;
