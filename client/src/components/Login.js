import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

import baseUrl from '../config/constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    axios.post(`${baseUrl}/authenticate`, {
      username: this.state.username,
      password: this.state.password
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user);
      this.context.router.history.push(`/users/${response.data.user.username}`);
    });
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      const username = localStorage.getItem('user').username;
      this.context.router.history.push(`/users/${username}`);
    }
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.onFormSubmit.bind(this)}>
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

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Login;
