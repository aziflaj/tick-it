import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { apiCall } from '../../helpers/api';

class NotificationItem extends Component {
  markAsRead(action) {
    apiCall(`notifications/${this.props.id}/read`, 'put').then(response => {
      if (response.data.status === 'ok' && action === 'mark') {
        window.location.reload();
      } else {
        this.context.router.history.push(`/ticket/${this.props.ticket}`);
      }
    });
  }

  render() {
    let mark = '';
    if(this.props.read === 'false') {
      mark = (<button title="Mark as Read" className="pull-right mark" onClick={this.markAsRead.bind(this, "mark")}>
      <span
        className="glyphicon glyphicon-check"
        aria-hidden="true"
      >
      </span>
      </button>);
    }
    return (
      <div className="notification well">
        <p className="pull-left" onClick={this.markAsRead.bind(this, "open")}>{this.props.message}</p>
        {mark}
      </div>
    );
  }
}

NotificationItem.contextTypes = {
  router: PropTypes.object.isRequired
}

export default NotificationItem;
