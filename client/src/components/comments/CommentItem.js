import React, { Component } from 'react';

import '../../styles.css';

class CommentItem extends Component {
  render() {
    const author = (this.props.author_id === localStorage.getItem('user').id) ? 'You' : 'Support';

    return (
      <div className="comment well">
        <p>{author}</p>
        <p>{this.props.content}</p>
        <p>{this.props.created_at}</p>
      </div>
    );
  }
}
export default CommentItem;
