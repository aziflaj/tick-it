import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CustomerLinks from './CustomerLinks';
import SupportLinks from './SupportLinks';
import '../../styles.css';
import logo from '../../logo.png';

class AppBar extends Component {
  handleLogout(e) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.context.router.history.push('/');
  }

  render() {
    let loggedInDiv = '';
    if (localStorage.getItem('token')) {
      const user = JSON.parse(localStorage.getItem('user'));
      
      loggedInDiv = (
        <div className="collapse navbar-collapse">
          {(user.role === 'customer') ? <CustomerLinks /> : <SupportLinks />}

          <ul className="nav navbar-nav navbar-right">
            <li>
              <button className="btn btn-link" onClick={this.handleLogout.bind(this)}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#" style={{paddingTop: 10}}>
              <img alt="tick-it" src={logo} />
            </a>
          </div>

          {loggedInDiv}
        </div>
      </nav>
    )
  }
}

AppBar.contextTypes = {
  router: PropTypes.object.isRequired
}

export default AppBar;
