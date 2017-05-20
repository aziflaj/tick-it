import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TicketItem extends Component {
  render() {
    let assigned = '';
    if (this.props.supporter === 'none') {
      assigned = (
        <p>
          This ticket is not assigned to a supporter.
        </p>
      );
    } else if (this.props.supporter === 'you') {
      assigned = (
        <p>
          This ticket is assigned to you.
        </p>
      );
    } else if(this.props.supporter) {
      assigned = (
        <p>
          This ticket is assigned to <Link to={`/users/${this.props.supporter}`}>{this.props.supporter}</Link>
        </p>
      );
    }

    let created = '';
    if (this.props.customer === 'you') {
      created = (
        <p>
          Created by you
        </p>
      );
    } else if (this.props.customer) {
      created = (
        <p>
          Created by <Link to={`/users/${this.props.customer}`}>{this.props.customer}</Link>
        </p>
      );
    }

    return (
      <div className="ticket well">
        <h3><Link to={`/ticket/${this.props.id}`}>{this.props.title}</Link></h3>
        {created}
        <p>{this.props.status}</p>
        <p>{this.props.description}</p>
        {assigned}
      </div>
    );
  }
}
export default TicketItem;
