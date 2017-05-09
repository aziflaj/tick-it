import React, { Component } from 'react';

import '../../styles.css';

class SupporterItem extends Component {
  render() {
    return (
      <div className="supporters well">
        <h3><Link to={`/users/${this.props.id}`}>{this.props.title}</Link></h3>
        <p>{this.props.status}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
export default SupporterItem;
