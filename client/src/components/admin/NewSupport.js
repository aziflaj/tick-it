import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import baseUrl from '../../config/constants';

class NewSupport extends Component {
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
    axios.post(`${baseUrl}/users`, {
      full_name: this.state.full_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role: 'supporter'
    }).then((response) => {
      if (response.data.status === 'ok') {
        alert('New support was created.');
        this.context.router.history.push('/supporters');
      } else {
        this.setState({
          errorMessage: response.data.message,
          disabled: false
        });
      }
    });
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.onFormSubmit.bind(this)}>
        <h2>Please enter the required information to create a new profile.</h2>
        <div className="form-group">
          <label htmlFor="inputFullName" className="control-label col-sm-2">Full Name</label>
          <div className="col-sm-8">
            <input id="inputFullName"
                   type="text"
                   className="form-control"
                   placeholder="Full Name"
                   required
                   autoFocus
                   onChange={this.onFullNameChange.bind(this)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputUsername" className="control-label col-sm-2">Username</label>
          <div className="col-sm-8">
            <input id="inputUsername"
                   type="text"
                   className="form-control"
                   placeholder="Username"
                   required
                   autoFocus
                   onChange={this.onUsernameChange.bind(this)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputEmail" className="control-label col-sm-2">E-Mail</label>
          <div className="col-sm-8">
            <input id="inputEmail"
                   type="text"
                   className="form-control"
                   placeholder="E-Mail"
                   required
                   autoFocus
                   onChange={this.onEmailChange.bind(this)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword" className="control-label col-sm-2">Password</label>
          <div className="col-sm-8">
            <input type="password"
                   id="inputPassword"
                   className="form-control"
                   placeholder="Password"
                   onChange={this.onPasswordChange.bind(this)}
                   required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" disabled={this.state.disabled}>Create</button>
          </div>
        </div>
      </form>
    );
  }
}

NewSupport.contextTypes = {
  router: PropTypes.object.isRequired
}

export default NewSupport;
