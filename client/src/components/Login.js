import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import baseUrl from '../config/constants';
import { showLoading, hideLoading } from '../helpers';
import '../styles.css';

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
    axios.post(`${baseUrl}/authenticate`, {
      username: this.state.username,
      password: this.state.password
    }).then((response) => {
      hideLoading();
      if (response.data.status === 'ok') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.context.router.history.push(`/users/${response.data.user.username}`);
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
