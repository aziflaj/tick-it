import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { apiCall } from '../../helpers/api';

class TicketItem extends Component {
  assignToSelf() {
    apiCall(`tickets/${this.props.id}/assign`, 'get').then(response => {
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  markAsClosed() {
    const data = {
      status: 'closed',
      title: this.props.title,
      description: this.props.description,
      supporter_id: this.props.supporterId
    };

    apiCall(`tickets/${this.props.id}`, 'put', data).then(response => {
      console.log(response);
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  render() {
    let assigned = '';
    let created = '';
    let assignButton = '';
    let closeButton = '';

    if (this.context.router.route.location.pathname === `/ticket/${this.props.id}`) {
      if (this.props.supporter === 'none') {
        assigned = <p>This ticket is not assigned to a supporter.</p>;
        if(JSON.parse(localStorage.getItem('user')).role === 'supporter') {
          assignButton = (
            <button className="btn btn-primary jeshile" onClick={this.assignToSelf.bind(this)}>
              Assign to self
            </button>
          );
        }
      } else if (this.props.supporter === 'you') {
        assigned = <p>This ticket is assigned to you.</p>;
          if (this.props.status === 'opened') {
            closeButton = (
              <button className="btn btn-danger" onClick={this.markAsClosed.bind(this)}>
                Mark as closed
              </button>
            );
          }
      } else {
        assigned = (
          <p>
            This ticket is assigned to <Link to={`/users/${this.props.supporter}`}>{this.props.supporter}</Link>
          </p>
        );
      }
      if (this.props.customer === 'you') {
        created = <p>Created by you</p>;
          if (this.props.status === 'opened') {
            closeButton = (
              <button className="btn btn-danger" onClick={this.markAsClosed.bind(this)}>
                Mark as closed
              </button>
            );
          }
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
          {assignButton}
          {closeButton}
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
