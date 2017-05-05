import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import '../styles.css';

import AppBar from '../components/AppBar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Profile from '../components/Profile';

import NewTicket from '../components/tickets/NewTicket';
import TicketsList from '../components/tickets/TicketsList';
import Ticket from '../components/tickets/Ticket';

const routes = (
  <HashRouter>
    <div className="html-content">
      <AppBar />
      <div className="container">
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/users/:username" component={Profile} />
        <Route exact path="/tickets" component={TicketsList} />
        <Route exact path="/tickets/create" component={NewTicket} />
        <Route path="/tickets/:id" component={Ticket} />
      </div>
    </div>
  </HashRouter>
);

export default routes;
