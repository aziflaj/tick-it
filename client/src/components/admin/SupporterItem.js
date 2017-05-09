import React, { Component } from 'react';

import '../../styles.css';

class SupporterItem extends Component {
  render() {
    return (
      <div className="supporter well">
        <h3><Link to={`/users/${this.props.id}`}>{this.props.username}</Link></h3>
        <p>{this.props.full_name}</p>
        <p>{this.props.email}</p>
      </div>
    );
  }
}
export default SupporterItem;
