import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TicketItem from './TicketItem';
import CommentsList from '../comments/CommentsList';
import NewComment from '../comments/NewComment';
import baseUrl from '../../config/constants';
import '../../styles.css';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: {
        title: '',
        description: '',
        status: ''
      },
      comments: []
    };
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null) {
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `${baseUrl}/tickets/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      const data = response.data.ticket;
      this.setState({ ticket: data.ticket, comments: data.comments });
    });
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    let assignButton = '';
    if (user.role === 'support' && typeof this.state.ticket.supporter_id === 'undefined') {
      assignButton = (
        <button className="btn btn-primary" onClick={this.assignToSelf.bind(this)}>
          Assign to self
        </button>
      );
    }
    let closeButton = '';
    if (((this.state.ticket.customer_id === user.id && user.role === 'customer')
         || (this.state.ticket.supporter_id === user.id && user.role === 'support'))
         && this.state.ticket.status === 'opened'
       ) {
      closeButton = (
        <button className="btn btn-danger" onClick={this.markAsClosed.bind(this)}>
          Mark as closed
        </button>
      );
    }

    let commentForm = '';
    if (this.state.ticket.status === 'opened') {
      commentForm = (
        <NewComment
          ticketId={this.state.ticket.id}
        />
      );
    }

    return (
      <div className="ticket">
        <TicketItem
          id={this.state.ticket.id}
          title={this.state.ticket.title}
          status={this.state.ticket.status}
          description={this.state.ticket.description}
        />
        {assignButton}
        {closeButton}
        {commentForm}
        <CommentsList
          comments={this.state.comments}
        />
      </div>
    );
  }

  assignToSelf() {
    axios({
      method: 'get',
      url: `${baseUrl}/tickets/${this.props.match.params.id}/assign`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  markAsClosed() {
    axios({
      method: 'put',
      url: `${baseUrl}/tickets/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      data: {
        status: 'closed',
        title: this.state.ticket.title,
        description: this.state.ticket.description
      }
    }).then((response) => {
      console.log(response);
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }
}

Ticket.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Ticket;
