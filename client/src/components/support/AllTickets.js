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
    this.getTickets(1);
    // axios({
    //   method: 'get',
    //   url: `${baseUrl}/tickets?type=all`,
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    // }).then((response) => {
    //   this.setState({
    //     tickets: response.data.tickets,
    //     currentPage: response.data.currentPage,
    //     pages: response.data.pages
    //   });
    // });
  }

  renderTicketList(tickets) {
    if (tickets.length === 0) {
      return (
        <div>
          <h3>There are no tickets</h3>
        </div>
      );
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
        {this.renderTicketList(this.state.tickets)}
        {paginator}
      </div>
    );
  }

  getTickets(page = 1) {
    axios({
      method: 'get',
      url: `${baseUrl}/tickets?page=${page}`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      this.setState({
        tickets: response.data.tickets,
        currentPage: parseInt(response.data.currentPage, 10),
        pages: parseInt(response.data.pages, 10)
      });
    });
  }
}

export default AllTickets;
