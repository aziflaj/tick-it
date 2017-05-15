import React, { Component } from 'react';
import axios from 'axios';

import NotificationList from './NotificationList';
import baseUrl from '../../config/constants';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      unread: []
    };
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null) {
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `${baseUrl}/notifications`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      const all = response.data.notifications;
      const unread = all.filter(item => item.read === 'false');
      this.setState({all: all, unread: unread});
    });
  }

  markAllAsRead() {
    axios({
      method: 'put',
      url: `${baseUrl}/notifications/readall`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  render() {
    return (
      <div className="notifications row">
        <ul className="nav nav-pills nav-stacked col-md-3" role="tablist">
          <li role="presentation" className="active">
            <a href="#unread" aria-controls="unread" role="tab" data-toggle="tab">Unread</a>
          </li>
          <li role="presentation">
            <a href="#all" aria-controls="all" role="tab" data-toggle="tab">All Notifications</a>
          </li>
        </ul>

        <div className="tab-content col-md-8">
          <div role="tabpanel" className="tab-pane active" id="unread">
            <button className="pull-right btn btn-primary" onClick={this.markAllAsRead.bind(this)}>
              Mark all as read
            </button>
            <NotificationList notifications={this.state.unread} />
          </div>
          <div role="tabpanel" className="tab-pane" id="all">
            <NotificationList notifications={this.state.all} />
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;