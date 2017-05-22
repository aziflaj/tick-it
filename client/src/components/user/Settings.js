import React, { Component } from 'react';
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
      password: user.password,
      inputPassword: '',
      newPassword: '',
      confirmPassword: '',
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

  onInfoFormSubmit(e) {
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

  onCurrentPasswordChange(e) {
    this.setState({ inputPassword: e.target.value });
  }

  onNewPasswordChange(e) {
    this.setState({ newPassword: e.target.value });
  }

  onConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  onPassFormSubmit(e) {
    if (this.state.newPassword === this.state.confirmPassword) {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = {
        currentPass: this.state.inputPassword,
        newPass: this.state.newPassword
      };

      apiCall(`users/${user.username}/password`, 'put', data).then(response => {
        console.log(response);
        if (response.data.status === 'error') {
          alert('The current password you entered was incorrect.');
        } else {
          this.setState({ disabled: false });
          hideLoading();

          this.context.router.history.push(`/users/${user.username}`);
        }
      });
    } else {
      alert('New and Confirm Password should match!');
    }
  }

  render() {
    return (
      <div className="row">
        <ul className="nav nav-pills nav-stacked col-md-3" role="tablist">
          <li role="presentation" className="active">
            <a href="#general" aria-controls="unread" role="tab" data-toggle="tab">General</a>
          </li>
          <li role="presentation">
            <a href="#password" aria-controls="all" role="tab" data-toggle="tab">Password</a>
          </li>
        </ul>

        <div className="tab-content col-md-8">
          <div role="tabpanel" className="tab-pane active" id="general">
            <form className="form-horizontal" onSubmit={this.onInfoFormSubmit.bind(this)}>
              <h4 className="form-signin-heading">Update your profile information</h4>
              <br />
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
                <div className="pull-left">
                  <button className="btn btn-sm btn-danger" onClick={this.onDeleteAccount.bind(this)} disabled={this.state.disabled}>Delete Account</button>
                </div>
                <div className="pull-right">
                  <button className="btn btn-sm btn-default" onClick={this.onCanceledRequest.bind(this)} disabled={this.state.disabled}>Cancel</button>
                  <button className="btn btn-sm btn-primary" type="submit" disabled={this.state.disabled}>Save</button>
                </div>
              </div>
            </form>
          </div>
          <div role="tabpanel" className="tab-pane" id="password">
            <form className="form-horizontal" onSubmit={this.onPassFormSubmit.bind(this)}>
              <h4 className="form-signin-heading">Change your password</h4>
              <br />
              <div className="form-group">
                <label htmlFor="inputCurrentPassword" className="control-label col-sm-4">Current Password</label>
                <div className="col-sm-8">
                  <input id="inputCurrentPassword"
                    type="password"
                    className="form-control"
                    required
                    autoFocus
                    onChange={this.onCurrentPasswordChange.bind(this)}
                    />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputNewPassword" className="control-label col-sm-4">New Password</label>
                <div className="col-sm-8">
                  <input id="inputNewPassword"
                    type="password"
                    className="form-control"
                    required
                    autoFocus
                    onChange={this.onNewPasswordChange.bind(this)}
                    />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputConfirmPassword" className="control-label col-sm-4">Confirm Password</label>
                <div className="col-sm-8">
                  <input id="inputConfirmPassword"
                    type="password"
                    className="form-control"
                    required
                    autoFocus
                    onChange={this.onConfirmPasswordChange.bind(this)}
                    />
                </div>
              </div>

              <div className="form-group">
                <div className="pull-left">
                  <button className="btn btn-sm btn-default" onClick={this.onCanceledRequest.bind(this)} disabled={this.state.disabled}>Cancel</button>
                </div>
                <div className="pull-right">
                  <button className="btn btn-sm btn-primary" type="submit" disabled={this.state.disabled}>Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Settings;
