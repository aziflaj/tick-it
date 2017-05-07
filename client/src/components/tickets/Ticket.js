import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TicketItem from './TicketItem';
import CommentsList from '../comments/CommentsList';
import '../../styles.css';
import baseUrl from '../../config/constants';

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
        <button
          className="btn btn-primary"
          onClick={this.assignToSelf.bind(this)}
        >
          Assign to self
        </button>
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
        <CommentsList
          ticketId={this.state.ticket.id}
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
}

Ticket.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Ticket;
