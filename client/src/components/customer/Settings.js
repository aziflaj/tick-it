import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles.css';
import baseUrl from '../config/constants';

class Settings extends Component {
  const user = JSON.parse(localStorage.getItem('user'));

  constructor(props) {
    super(props);
    this.state = {
      username: user.username,
      email: user.email,
      full_name: user.full_name,
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

  onDeleteAccount() {
    //TODO
  }

  onCanceledRequest() {
    //TODO
  }

  onFormSubmit(e) {
    //TODO
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.onFormSubmit.bind(this)}>
        <h2 className="form-signin-heading">Settings</h2>
        <label htmlFor="inputFullName" className="sr-only">Full Name</label>
        <input id="inputFullName"
               type="text"
               className="form-control"
               value={this.state.full_name}
               required
               autoFocus
               onChange={this.onFullNameChange.bind(this)}
            />

        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input id="inputUsername"
               type="text"
               className="form-control"
               value={this.state.username}
               required
               autoFocus
               onChange={this.onUsernameChange.bind(this)}
        />

        <label htmlFor="inputEmail" className="sr-only">E-Mail</label>
        <input id="inputEmail"
               type="text"
               className="form-control"
               value={this.state.email}
               required
               autoFocus
               onChange={this.onEmailChange.bind(this)}
        />

        <div>

        <button className="btn btn-lg btn-primary btn-block" onClick={this.onDeleteAccount()} disabled={this.state.disabled}>Delete Account</button>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.onCanceledRequest()} disabled={this.state.disabled}>Cancel</button>
        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={this.state.disabled}>Save</button>
      </form>
    );
  }
}

Settings.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Settings;
