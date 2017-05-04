import React, { Component } from 'react';
import '../styles.css';

class AppBar extends Component {
  handleLogout(e) {
    console.log('logout');
  }

  render() {
    let logoutDiv = '';
    if (localStorage.getItem('token')) {
      logoutDiv = (
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
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

          {logoutDiv}
        </div>
      </nav>
    )
  }
}

export default AppBar;
