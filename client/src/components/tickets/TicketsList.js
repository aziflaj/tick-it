import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TicketItem from '../tickets/TicketItem';
import Paginator from '../Paginator';
import { apiCall } from '../../helpers/api';

class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      currentPage: 1,
      pages: 1
    };
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null) {
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    this.getTickets(1);
  }

  renderTicketList(tickets) {
    if (tickets.length === 0) {
      return this.renderEmptyList();
    }

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

  onFirst() {
    this.getTickets(1);
  }

  onPrev() {
    if (this.state.currentPage !== 1) {
      this.getTickets(this.state.currentPage - 1);
    }
  }

  onNext() {
    if (this.state.currentPage !== this.state.pages) {
      this.getTickets(this.state.currentPage + 1);
    }
  }

  onLast() {
    this.getTickets(this.state.pages);
  }

  getTickets(page = 1) {
    apiCall('tickets', 'get', { page: page }).then(response => {
      this.setState({
        tickets: response.data.tickets,
        currentPage: parseInt(response.data.currentPage, 10),
        pages: parseInt(response.data.pages, 10)
      });
    });
  }
  
  render() {
    let paginator = '';
    if (this.state.pages !== 1) {
      paginator = (
        <Paginator
          currentPage={this.state.currentPage}
          pagesCount={this.state.pages}
          onFirst={this.onFirst.bind(this)}
          onPrev={this.onPrev.bind(this)}
          onNext={this.onNext.bind(this)}
          onLast={this.onLast.bind(this)}
        />
      );
    }

    return (
      <div className="tickets-listing">
        {paginator}
        {this.renderTicketList(this.state.tickets)}
        {paginator}
      </div>
    );
  }

}

export default TicketsList;
