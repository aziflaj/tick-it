import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SupportLinks extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <Link to='/tickets'>All Tickets</Link>
        <Link to='/tickets/mine'>My Tickets</Link>
      </ul>
    );
  }
}
export default SupportLinks;
