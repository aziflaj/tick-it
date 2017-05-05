import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import '../styles.css';

class AppBar extends Component {
  handleLogout(e) {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.context.router.history.push('/');
  }

  render() {
    let loggedInDiv = '';
    if (localStorage.getItem('token')) {
      loggedInDiv = (
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <Link to='/tickets'>My Tickets</Link>
            <Link to='/tickets/create'>New Ticket</Link>
          </ul>

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
            <a className="navbar-brand" href="#">Tick-it</a>
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
