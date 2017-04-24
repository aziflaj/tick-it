import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Login from '../components/Login';
import SignUp from '../components/SignUp';

const routes = (
  <HashRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
    </div>
  </HashRouter>
);

export default routes;
