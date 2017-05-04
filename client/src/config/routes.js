import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import '../styles.css';

import AppBar from '../components/AppBar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Profile from '../components/Profile';
import NewTicket from '../components/NewTicket';

const routes = (
  <HashRouter>
    <div className="html-content">
      <AppBar />
      <div className="container">
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/users/:username" component={Profile} />
        <Route path="/tickets/create" component={NewTicket} />
      </div>
    </div>
  </HashRouter>
);

export default routes;
