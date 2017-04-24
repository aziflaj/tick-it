import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css';

import baseUrl from '../helpers/Constants';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      full_name: ''
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
    axios.post(`${baseUrl}/users`, {
      full_name: this.state.full_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.onFormSubmit.bind(this)}>
       <h2 className="form-signin-heading">Please enter the required information to sign up.</h2>
       <label htmlFor="inputFullName" className="sr-only">Full Name</label>
       <input id="inputFullName"
              type="text"
              className="form-control"
              placeholder="Full Name"
              required
              autoFocus
              onChange={this.onFullNameChange.bind(this)}
        />

       <label htmlFor="inputUsername" className="sr-only">Username</label>
       <input id="inputUsername"
              type="text"
              className="form-control"
              placeholder="Username"
              required
              autoFocus
              onChange={this.onUsernameChange.bind(this)}
        />

        <label htmlFor="inputEmail" className="sr-only">E-Mail</label>
        <input id="inputEmail"
               type="text"
               className="form-control"
               placeholder="E-Mail"
               required
               autoFocus
               onChange={this.onEmailChange.bind(this)}
         />

       <label htmlFor="inputPassword" className="sr-only">Password</label>
       <input type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              onChange={this.onPasswordChange.bind(this)}
              required
        />
       <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
     </form>
    );
  }
}

export default SignUp;
