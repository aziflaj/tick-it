import React, { Component } from 'react';
import axios from 'axios';

import TicketItem from '../tickets/TicketItem';
import Paginator from '../Paginator';
import baseUrl from '../../config/constants';

class AllTickets extends Component {
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
    axios({
      method: 'get',
      url: `${baseUrl}/tickets?type=all`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      this.setState({
        tickets: response.data.tickets,
        currentPage: response.data.currentPage,
        pages: response.data.pages
      });
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
        <h3>There are no tickets</h3>
      </div>
    );
  }

  onFirst() {
    console.log('first');
  }

  onPrev() {
    console.log('prev');
  }

  onNext() {
    console.log('next');
  }

  onLast() {
    console.log('last');
  }

  render() {
    let paginator = '';
    console.log(this.state.pages);
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
        {this.state.tickets.length === 0 ? this.renderEmptyList() : this.renderTicketList(this.state.tickets)}
        {paginator}
      </div>
    );
  }
}

export default AllTickets;
