import React, { Component } from 'react';
import axios from 'axios';

import CommentItem from './CommentItem';
import baseUrl from '../../config/constants';
import '../../styles.css';

class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

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

  onCommentChange(e) {
    this.setState({ content: e.target.value });
  }

  onCommentSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${baseUrl}/tickets/${this.props.ticketId}/comments`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      data: { content: this.state.content }
    }).then((response) => {
      if (response.data.status === 'ok') {
        this.setState({ content: '' });
        window.location.reload();
      }
    });
  }

  render() {
    return (
      <div className="comments-listing" onSubmit={this.onCommentSubmit.bind(this)}>
        <form>
          <div className="form-group">
            <textarea id="inputComment"
                      type="text"
                      className="form-control"
                      required
                      autoFocus
                      placeholder="Comment"
                      onChange={this.onCommentChange.bind(this)}
            />
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-success">Comment</button>
            </div>
          </div>
        </form>

        {this.renderCommentList(this.props.comments)}
      </div>
    );
  }
}

export default CommentsList;
