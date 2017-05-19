import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminLinks extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <li>
          <Link to='/supporters'>All Supporters</Link>
        </li>
        <li>
          <Link to='/tickets'>All Tickets</Link>
        </li>
      </ul>
    );
  }
}
export default AdminLinks;
