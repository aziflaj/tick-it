import React, { Component } from 'react';
// import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';


import { apiCall } from '../../helpers/api';
import { showLoading, hideLoading, updateObject } from '../../helpers';

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
        apiCall(`users/${JSON.parse(localStorage.getItem('user')).username}`, 'delete').then(response => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.context.router.history.push('/');
        });
      }
    });
  }

  onCanceledRequest() {
    this.context.router.history.push(`/users/${JSON.parse(localStorage.getItem('user')).username}`);
  }

  onFormSubmit(e) {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      username: this.state.username,
      email: this.state.email,
      full_name: this.state.full_name
    };

    this.setState({ disabled: true });
    showLoading();
    apiCall(`users/${user.username}`, 'put', data).then(response => {
      this.setState({ disabled: false });
      hideLoading();

      const newUser = JSON.parse(response.config.data);
      const currentUser = updateObject(user, newUser);

      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(currentUser));

      this.context.router.history.push(`/users/${currentUser.username}`);
    });
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.onFormSubmit.bind(this)}>
        <h2 className="form-signin-heading">Settings</h2>
        <div className="form-group">
          <label htmlFor="inputFullName" className="control-label col-sm-4">Full Name</label>
          <div className="col-sm-8">
            <input id="inputFullName"
              type="text"
              className="form-control"
              value={this.state.full_name}
              required
              autoFocus
              onChange={this.onFullNameChange.bind(this)}
              />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputUsername" className="control-label col-sm-4">Username</label>
          <div className="col-sm-8">
            <input id="inputUsername"
              type="text"
              className="form-control"
              value={this.state.username}
              required
              autoFocus
              onChange={this.onUsernameChange.bind(this)}
              />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputEmail" className="control-label col-sm-4">E-Mail</label>
          <div className="col-sm-8">
            <input id="inputEmail"
              type="text"
              className="form-control"
              value={this.state.email}
              required
              autoFocus
              onChange={this.onEmailChange.bind(this)}
              />
          </div>
        </div>

        <div className="form-group">
          <div className="pull-left col-sm-offset-2 col-sm-10">
            <button className="btn btn-sm btn-danger" onClick={this.onDeleteAccount.bind(this)} disabled={this.state.disabled}>Delete Account</button>
          </div>
          <div className="pull-right">
            <button className="btn btn-sm btn-default" onClick={this.onCanceledRequest.bind(this)} disabled={this.state.disabled}>Cancel</button>
            <button className="btn btn-sm btn-primary" type="submit" disabled={this.state.disabled}>Save</button>
          </div>
        </div>
      </form>
    );
  }
}

Settings.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Settings;
