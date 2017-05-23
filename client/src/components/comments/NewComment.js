import React, { Component } from 'react';

import { apiCall } from '../../helpers/api';

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  onCommentChange(e) {
    this.setState({ content: e.target.value });
  }

  onCommentSubmit(e) {
    e.preventDefault();
    apiCall(`tickets/${this.props.ticketId}/comments`, 'post', { content: this.state.content }).then(response => {
      if (response.data.status === 'ok') {
        this.setState({ content: '' });
        window.location.reload();
      }
    });
  }

  render() {
    return (
      <div className="comment-form col-md-5" onSubmit={this.onCommentSubmit.bind(this)}>
        <form className="form-inline">
          <textarea id="inputComment"
                    type="text"
                    className="form-control"
                    required
                    rows={4}
                    cols={60}
                    placeholder="Your comment goes here"
                    onChange={this.onCommentChange.bind(this)}
          />
          <button type="submit" className="btn btn-success">Comment</button>
        </form>
      </div>
    );
  }
}

export default NewComment;
