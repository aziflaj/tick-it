import React, { Component } from 'react';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../styles.css';
import baseUrl from '../../config/constants';

class Settings extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'));
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
    confirmAlert({
      title: 'Delete profile',
      message: 'Are you sure you want to delete your profile?',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        axios({
          method: 'delete',
          url: `${baseUrl}/users/${JSON.parse(localStorage.getItem('user')).username}`,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        }).then((response) => {
          console.log(response);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.context.router.history.push(`/`);
        });
      }
    });
  }

  onCanceledRequest() {
    this.context.router.history.push(`/users/${JSON.parse(localStorage.getItem('user')).username}`);
  }

  onFormSubmit(e) {
    axios({
      method: 'put',
      url: `${baseUrl}/users/${JSON.parse(localStorage.getItem('user')).username}`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      data: {
        username: this.state.username,
        email: this.state.email,
        full_name: this.state.full_name
      }
    }).then((response) => {
      console.log(response);
      this.context.router.history.push(`/users/${JSON.parse(localStorage.getItem('user')).username}`);
    });
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
          <button className="btn btn-lg btn-primary btn-block" onClick={this.onDeleteAccount.bind(this)} disabled={this.state.disabled}>Delete Account</button>
          <button className="btn btn-lg btn-primary btn-block" onClick={this.onCanceledRequest.bind(this)} disabled={this.state.disabled}>Cancel</button>
          <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={this.state.disabled}>Save</button>
        </div>
      </form>
    );
  }
}

Settings.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Settings;
