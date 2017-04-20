import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onEmailChange(e) {
    this.setState({email: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state);
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
       <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
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
