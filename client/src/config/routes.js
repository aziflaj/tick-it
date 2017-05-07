import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import '../styles.css';

import AppBar from '../components/nav/AppBar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Profile from '../components/Profile';

import NewTicket from '../components/customer/NewTicket';
import TicketsList from '../components/customer/TicketsList';

import AllTickets from '../components/support/AllTickets';
import MyTickets from '../components/support/MyTickets';

import Ticket from '../components/tickets/Ticket';

const routes = (
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

export default routes;
