import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CustomerLinks extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <li>
          <Link to='/tickets'>My Tickets</Link>
        </li>
        <li>
          <Link to='/tickets/create'>New Ticket</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
      </ul>
    );
  }
}
export default CustomerLinks;
