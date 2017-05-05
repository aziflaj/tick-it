import React, { Component } from 'react';
import axios from 'axios';

import TicketItem from './TicketItem';
import '../../styles.css';
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
      console.log(response.data);
      this.setState({ tickets: response.data.tickets });
    });
  }

  render() {
    return (
      <div className="tickets-listing">
        {this.state.tickets.map(ticket => {
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
}

export default TicketsList;
