import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TicketItem extends Component {
  render() {
    let assigned = '';
    if (this.props.supporter === 'none') {
      assigned = <p>This ticket is not assigned to a supporter.</p>;
    } else if (this.props.supporter === 'you') {
      assigned = <p>This ticket is assigned to you.</p>;
    } else if(this.props.supporter) {
      assigned = (
        <p>
          This ticket is assigned to <Link to={`/users/${this.props.supporter}`}>{this.props.supporter}</Link>
        </p>
      );
    }

    let created = '';
    if (this.props.customer === 'you') {
      created = <p>Created by you</p>;
    } else if (this.props.customer) {
      created = (
        <p>
          Created by <Link to={`/users/${this.props.customer}`}>{this.props.customer}</Link>
        </p>
      );
    }

    const status = this.statusIcon(this.props.status);

    return (
      <div className="row">
        <div className="ticket well col-md-6 col-md-offset-3">
          <h3>{status} <Link to={`/ticket/${this.props.id}`}>{this.props.title}</Link></h3>
          {created}
          <p>{this.props.description}</p>
          {assigned}
        </div>
      </div>
    );
  }

  statusIcon(status) {
    if (status === 'opened') {
      return (
        <span
          className="glyphicon glyphicon-info-sign status-icon"
          aria-hidden="true"
        >
        </span>
      );
    } else {
      return (
        <span
          className="glyphicon glyphicon-ok-sign status-icon"
          aria-hidden="true"
        >
        </span>
      );
    }
  }
}
export default TicketItem;
