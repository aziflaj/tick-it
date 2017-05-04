import React, { Component } from 'react';

import '../../styles.css';

class TicketItem extends Component {
  render() {
    return (
      <div className="ticket well">
        <h3>{this.props.title}</h3>
        <p>{this.props.status}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
export default TicketItem;
