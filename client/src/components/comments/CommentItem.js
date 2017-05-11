import React, { Component } from 'react';

class CommentItem extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const author = (this.props.author === user.id) ? 'You' : 'Support';

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
