import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminLinks extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <Link to='/supporters'>All Supporters</Link>
        <Link to='/tickets/all'>All Tickets</Link>
      </ul>
    );
  }
}
export default AdminLinks;
