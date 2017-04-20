import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css';

import {baseUrl} from '../helpers/Constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    axios.post(`${baseUrl}/authenticate`, {
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.onFormSubmit.bind(this)}>
       <h2 className="form-signin-heading">Please sign in</h2>
       <label for="inputEmail" className="sr-only">Email address</label>
       <input id="inputEmail"
              type="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              onChange={this.onEmailChange.bind(this)}
        />

       <label for="inputPassword" className="sr-only">Password</label>
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
       <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
     </form>
    );
  }
}

export default Login;
