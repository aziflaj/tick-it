import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TicketItem from '../tickets/TicketItem';
import baseUrl from '../../config/constants';

class MyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = { tickets: [] };
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null) {
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `${baseUrl}/tickets?type=mine`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      this.setState({ tickets: response.data.tickets });
    });
  }

  renderTicketList(tickets) {
    return (
      <div>
        {tickets.map(ticket => {
          return (
            <TicketItem
              id={ticket.id}
              key={ticket.id}
              title={ticket.title}
              status={ticket.status}
              description={ticket.description}
            />
          )
        })}
      </div>
    );
  }

  renderEmptyList() {
    return (
      <div>
        <h3>You have no tickets</h3>
        <Link to='/tickets/all'>Assign one to yourself</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="tickets-listing">
        {this.state.tickets.length === 0 ? this.renderEmptyList() : this.renderTicketList(this.state.tickets)}
      </div>
    );
  }
}

export default MyTickets;
