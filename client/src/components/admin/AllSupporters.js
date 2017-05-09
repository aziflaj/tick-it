import React, { Component } from 'react';
import axios from 'axios';

import TicketItem from '../tickets/TicketItem';
import baseUrl from '../../config/constants';
import '../../styles.css';

class AllSupporters extends Component {
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
      url: `${baseUrl}/supporters?type=all`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      this.setState({ supporters: response.data.supporters });
    });
  }

  renderSupportersList(supporters) {
    return (
      <div>
        {supporters.map(supporter => {
          return (
            <SupporterItem
              id={supporter.id}
              key={supporter.id}
              title={supporter.title}
              status={supporter.status}
              description={supporter.description}
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

  render() {
    return (
      <div className="supporters-listing">
        {this.state.tickets.length === 0 ? this.renderEmptyList() : this.renderSupportersList(this.state.tickets)}
      </div>
    );
  }
}

export default AllSupporters;
