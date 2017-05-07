import React, { Component } from 'react';

import CommentItem from './CommentItem';
import '../../styles.css';

class CommentsList extends Component {
  renderCommentList(comments) {
    return (
      <div>
        {comments.map(comment => {
          return (
            <CommentItem
              id={comment.id}
              key={comment.id}
              author={comment.author_id}
              content={comment.content}
              created_at={comment.created_at}
            />
          )
        })}
      </div>
    );
  }

  render() {
      return (
        <div className="comments-listing">
          {this.renderCommentList(this.props.comments)}
        </div>
      );
  }
}

export default CommentsList;
