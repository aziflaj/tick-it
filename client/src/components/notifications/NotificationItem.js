import React, { Component } from 'react';
import axios from 'axios';

import baseUrl from '../../config/constants';

class NotificationItem extends Component {
  markAsRead() {
    axios({
      method: 'put',
      url: `${baseUrl}/notifications/${this.props.id}/read`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  render() {
    let mark = '';
    if(this.props.read === 'false') {
      mark = (<button className="pull-right btn btn-primary" onClick={this.markAsRead.bind(this)}>
        Mark as read
      </button>);
    }
    return (
      <div className="notification well">
        <p>{this.props.message}</p>
        {mark}
      </div>
    );
  }
}
export default NotificationItem;
