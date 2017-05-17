import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TicketItem from '../tickets/TicketItem';
import baseUrl from '../../config/constants';

class TicketsList extends Component {
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
      url: `${baseUrl}/tickets`,
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
    const user = JSON.parse(localStorage.getItem('user'));
    let emptyList = '';
    if (user.role === 'admin') {
      emptyList = (
        <h3>There are no tickets</h3>
      );
    } else {
      emptyList = (
        <div>
          <h3>You have no tickets</h3>
          <Link to='/tickets/create'>Create one now?</Link>
        </div>
      );
    }
    return (
      <div>
        {emptyList}
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

export default TicketsList;
