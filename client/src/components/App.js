import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import AppBar from './nav/AppBar';
import Login from './Login';
import SignUp from './SignUp';

import { Profile, Settings } from './user';
import { NewTicket } from './customer';
import { TicketsList } from './tickets'
import { MyTickets } from './support';
import { SupportersList, NewSupport } from './admin';
import Notifications from './notifications/Notifications';

import Ticket from './tickets/Ticket';

import '../styles.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="html-content">
          <div id="loading">
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          </div>
          <AppBar />
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/users/:username" component={Profile} />

            <Route path="/ticket/:id" component={Ticket} />

            <Route exact path="/tickets" component={TicketsList} />
            <Route exact path="/tickets/create" component={NewTicket} />

            <Route exact path="/tickets/mine" component={MyTickets} />

            <Route exact path="/supporters" component={SupportersList} />
            <Route exact path="/newsupport" component={NewSupport} />

            <Route exact path="/notifications" component={Notifications} />

            <Route path="/settings" component={Settings} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
