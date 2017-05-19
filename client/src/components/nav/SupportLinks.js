import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SupportLinks extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <li>
          <Link to='/tickets'>All Tickets</Link>
        </li>
        <li>
          <Link to='/tickets/mine'>My Tickets</Link>
        </li>
      </ul>
    );
  }
}
export default SupportLinks;
