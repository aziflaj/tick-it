import React, { Component } from 'react';
import axios from 'axios';

import SupporterItem from './SupporterItem';
import baseUrl from '../../config/constants';

class SupporterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supporters: []
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
      url: `${baseUrl}/supporters`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(response => {
      console.log(response);
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
              full_name={supporter.full_name}
              email={supporter.email}
              username={supporter.username}
            />
          )
        })}
      </div>
    );
  }

  renderEmptyList() {
    return (
      <div>
        <h3>There are no supporters</h3>
      </div>
    );
  }

  render() {
    return (
      <div className="supporters-listing">
        {this.state.supporters.length === 0 ? this.renderEmptyList() : this.renderSupportersList(this.state.supporters)}
      </div>
    );
  }
}

export default SupporterList;
