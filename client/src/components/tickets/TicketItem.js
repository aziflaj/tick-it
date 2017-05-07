import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles.css';

class TicketItem extends Component {
  render() {
    return (
      <div className="ticket well">
        <h3><Link to={`/ticket/${this.props.id}`}>{this.props.title}</Link></h3>
        <p>{this.props.status}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
export default TicketItem;
