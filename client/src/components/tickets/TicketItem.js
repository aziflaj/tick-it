import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TicketItem extends Component {
  render() {
    let assigned = '';
    let created = '';

    if (this.context.router.route.location.pathname === `/ticket/${this.props.id}`) {
      if (this.props.supporter === 'none') {
        assigned = <p>This ticket is not assigned to a supporter.</p>;
        } else if (this.props.supporter === 'you') {
          assigned = <p>This ticket is assigned to you.</p>;
          } else {
            assigned = (
              <p>
                This ticket is assigned to <Link to={`/users/${this.props.supporter}`}>{this.props.supporter}</Link>
            </p>
          );
        }
        if (this.props.customer === 'you') {
          created = <p>Created by you</p>;
          } else if (this.props.customer) {
            created = (
              <p>
                Created by <Link to={`/users/${this.props.customer}`}>{this.props.customer}</Link>
            </p>
          );
        }
    }

    const status = this.statusIcon(this.props.status);

    return (
      <div className="row">
        <div className="ticket well">
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

TicketItem.contextTypes = {
  router: PropTypes.object.isRequired
}

export default TicketItem;
