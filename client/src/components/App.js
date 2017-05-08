import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import AppBar from './nav/AppBar';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';

import { NewTicket, TicketsList } from './customer';

import { AllTickets, MyTickets } from './support';

import Ticket from './tickets/Ticket';

import '../styles.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="html-content">
          <AppBar />
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/users/:username" component={Profile} />

            <Route path="/ticket/:id" component={Ticket} />

            <Route exact path="/tickets" component={TicketsList} />
            <Route exact path="/tickets/create" component={NewTicket} />

            <Route exact path="/tickets/all" component={AllTickets} />
            <Route exact path="/tickets/mine" component={MyTickets} />

          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
