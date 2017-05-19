import React, { Component } from 'react';

import NotificationList from './NotificationList';
import { apiCall } from '../../helpers/api';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: {
        notifications: [],
        currentPage: 1,
        pages: 1
      },
      unread: {
        notifications: [],
        currentPage: 1,
        pages: 1
      }
    };
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null) {
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    apiCall('notifications/unread', 'get', { page: 1 }).then(response => {
      console.log('unread');
      console.log(response.data);
      this.setState({
        unread: {
          notifications: response.data.notifications,
          currentPage: parseInt(response.data.currentPage, 10),
          pages: parseInt(response.data.pages, 10)
        }
      });
    });

    apiCall('notifications/all', 'get', { page: 1 }).then(response => {
      console.log('all');
      console.log(response.data);
      this.setState({
        all: {
          notifications: response.data.notifications,
          currentPage: parseInt(response.data.currentPage, 10),
          pages: parseInt(response.data.pages, 10)
        }
      });
    });
  }

  markAllAsRead() {
    apiCall('notifications/readall', 'put', { page: 1 }).then(response => {
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
            <NotificationList notifications={this.state.unread.notifications} />
          </div>
          <div role="tabpanel" className="tab-pane" id="all">
            <NotificationList notifications={this.state.all.notifications} />
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;
