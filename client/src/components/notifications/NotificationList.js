import React, { Component } from 'react';

import NotificationItem from './NotificationItem';

class NotificationList extends Component {
  renderNotificationList(notifications) {
    return (
      <div>
        {notifications.map(notification => {
          return (
            <NotificationItem
              id={notification.id}
              key={notification.id}
              message={notification.message}
              read={notification.read}
              ticket={notification.ticket_id}
            />
          );
        })}
      </div>
    );
  }

  render() {
      return (
        <div className="notifications-listing">
          {this.renderNotificationList(this.props.notifications)}
        </div>
      );
  }
}

export default NotificationList;
