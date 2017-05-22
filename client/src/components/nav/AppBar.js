import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';

import { apiCall } from '../../helpers/api';

import CustomerLinks from './CustomerLinks';
import SupportLinks from './SupportLinks';
import AdminLinks from './AdminLinks';
import logo from '../../logo.png';

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications_count: localStorage.getItem('count')
    };
  }

  handleLogout(e) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.context.router.history.push('/');
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      const user = JSON.parse(localStorage.getItem('user'));
      const sock = io('http://localhost:5000');
      sock.on(`user:${user.id}`, (msg) => {
        alertify.message(msg.message);
        const currentCount = this.state.notifications_count;
        this.setState({ notifications_count: currentCount + 1 });
      });
    }
  }

  render() {
    let navbar = '';
    let notifications = '';
    if (localStorage.getItem('token')) {
      const user = JSON.parse(localStorage.getItem('user'));

      switch (user.role) {
        case 'customer':
          navbar = <CustomerLinks />;
          break;
        case 'supporter':
          navbar = <SupportLinks />;
          break;
        case 'admin':
          navbar = <AdminLinks />;
          break;
        default:
          navbar = '';
      }

      notifications = (
        <li>
          <Link to='/notifications'>
            Notifications
            <span className="badge badge-notification">{this.state.notifications_count}</span>
          </Link>
        </li>
      )
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

          <div className="collapse navbar-collapse">
            {navbar}

            <ul className="nav navbar-nav navbar-right">
              {notifications}
              <li>
                <a href="#" onClick={this.handleLogout.bind(this)}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

AppBar.contextTypes = {
  router: PropTypes.object.isRequired
}

export default AppBar;
