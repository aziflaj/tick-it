import React, { Component } from 'react';

class NotificationItem extends Component {
  render() {
    return (
      <div className="notification well">
        <p>{this.props.message}</p>
        <p>{this.props.read}</p>
      </div>
    );
  }
}
export default NotificationItem;
