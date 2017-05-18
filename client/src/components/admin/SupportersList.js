import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import SupporterItem from './SupporterItem';
import Paginator from '../Paginator';
import { apiCall } from '../../helpers/api';
import baseUrl from '../../config/constants';

class SupporterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supporters: [],
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
    this.getSupporters(1);
  }

  renderSupportersList(supporters) {
    if (supporters.length === 0) {
      return (
        <div>
          <h3>There are no supporters</h3>
        </div>
      );
    }

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

  addSupporter() {
    this.context.router.history.push(`/newsupport`);
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
      <div className="supporters-listing">
        <button className="pull-right btn btn-primary" onClick={this.addSupporter.bind(this)}>
          Add a new supporter
        </button>
        {paginator}
        {this.renderSupportersList(this.state.supporters)}
        {paginator}
      </div>
    );
  }

  getSupporters(page = 1) {
    apiCall('supporters', 'get', { page: page }).then(response => {
      this.setState({
        supporters: response.data.supporters,
        currentPage: parseInt(response.data.currentPage, 10),
        pages: parseInt(response.data.pages, 10)
      });
    });
  }
}

SupporterList.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SupporterList;
