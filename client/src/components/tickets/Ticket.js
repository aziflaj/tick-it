import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TicketItem from './TicketItem';
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
      }
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
      this.setState({ ticket: response.data.ticket });
    });
  }

  render() {
    return (
      <TicketItem
        id={this.state.ticket.id}
        title={this.state.ticket.title}
        status={this.state.ticket.status}
        description={this.state.ticket.description}
      />
    );
  }
}

Ticket.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Ticket;
