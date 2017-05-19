import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import TicketItem from '../tickets/TicketItem';
import { apiCall } from '../../helpers/api';

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
    apiCall('tickets', 'get', { type: 'mine' }).then(response => {
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
