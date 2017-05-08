import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles.css';

class CustomerLinks extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <Link to='/tickets'>My Tickets</Link>
        <Link to='/tickets/create'>New Ticket</Link>
        <Link to='/settings'>Settings</Link>
      </ul>
    );
  }
}
export default CustomerLinks;
