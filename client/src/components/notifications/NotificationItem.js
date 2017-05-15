import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import baseUrl from '../../config/constants';

class NotificationItem extends Component {
  markAsRead(action) {
    axios({
      method: 'put',
      url: `${baseUrl}/notifications/${this.props.id}/read`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
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
      mark = (<button className="pull-right btn btn-primary" onClick={this.markAsRead.bind(this, "mark")}>
        Mark as read
      </button>);
    }
    return (
      <div className="notification well">
        <p onClick={this.markAsRead.bind(this, "open")}>{this.props.message}</p>
        {mark}
      </div>
    );
  }
}

NotificationItem.contextTypes = {
  router: PropTypes.object.isRequired
}

export default NotificationItem;
