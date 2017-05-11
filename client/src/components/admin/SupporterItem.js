import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SupporterItem extends Component {
  render() {
    return (
      <div className="supporter well">
        <h3><Link to={`/users/${this.props.username}`}>{this.props.username}</Link></h3>
        <p>{this.props.full_name}</p>
        <p>{this.props.email}</p>
      </div>
    );
  }
}
export default SupporterItem;
