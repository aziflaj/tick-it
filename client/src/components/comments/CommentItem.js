import React, { Component } from 'react';
import Moment from 'react-moment';

class CommentItem extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const author = (this.props.author === user.id) ? 'You' : 'Support';

    return (
      <div className="comment well">
        <p>{author}</p>
        <p>{this.props.content}</p>
        <Moment fromNow ago unix format="">{this.props.created_at}</Moment>
      </div>
    );
  }
}
export default CommentItem;
