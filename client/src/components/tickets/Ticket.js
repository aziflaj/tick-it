import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Typeahead } from 'react-typeahead';

import TicketItem from './TicketItem';
import CommentsList from '../comments/CommentsList';
import NewComment from '../comments/NewComment';
import baseUrl from '../../config/constants';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: {
        title: '',
        description: '',
        status: ''
      },
      supporter: '',
      customer: '',
      suggestions: [],
      comments: []
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
      url: `${baseUrl}/tickets/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      const data = response.data;
      this.setState({ ticket: data.ticket.ticket,
                      comments: data.ticket.comments,
                      supporter: data.supporter,
                      customer: data.customer
                    });
    });
  }

  onSearchTermChange(e) {
    axios({
      method: 'get',
      url: `${baseUrl}/supporters/search?term=${e.target.value}`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(response => {
      this.setState({ suggestions: response.data.supporters.map(item => item.username) });
    });
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (this.state.customer === user.username) {
      this.setState({ customer: 'you' });
    }

    if (this.state.supporter === user.username) {
      this.setState({ supporter: 'you' });
    }

    let assignButton = '';
    if (!this.state.supporter) {
      this.setState({ supporter: 'none' });
      if (user.role === 'supporter') {
        assignButton = (
          <button className="btn btn-primary" onClick={this.assignToSelf.bind(this)}>
            Assign to self
          </button>
        );
      }
    }

    let closeButton = '';
    if (((this.state.ticket.customer_id === user.id && user.role === 'customer')
         || (this.state.ticket.supporter_id === user.id && user.role === 'supporter'))
         && this.state.ticket.status === 'opened'
       ) {
      closeButton = (
        <button className="btn btn-danger" onClick={this.markAsClosed.bind(this)}>
          Mark as closed
        </button>
      );
    }

    let commentForm = '';
    if (this.state.ticket.status === 'opened' && user.role !== 'admin') {
      commentForm = (
        <NewComment
          ticketId={this.state.ticket.id}
        />
      );
    }

    let setRemoveSupporter = '';
    if (user.role === 'admin') {
      if (this.state.supporter === 'none') {
        setRemoveSupporter = (
          <div className="doctors-search">
            <Typeahead
              id="doctors-search-txt"
              className="zerodarkthirty"
              options={this.state.suggestions}
              maxVisible={2}
              onKeyUp={this.onSearchTermChange.bind(this)}
            />
            <button type="button"
                     className="btn btn-sm btn-info btn-rounded"
                     id="assign-doctor-btn"
                     onClick={this.setSupporter.bind(this)}
            >
              Assign
            </button>
            <div className="results" id="doctors-search-results"></div>
          </div>
        );
      } else {
        setRemoveSupporter = (
          <button className="btn btn-danger" onClick={this.removeSupporter.bind(this)}>
            Unassign
          </button>
        );
      }
    }

    return (
      <div className="ticket">
        <TicketItem
          id={this.state.ticket.id}
          title={this.state.ticket.title}
          status={this.state.ticket.status}
          description={this.state.ticket.description}
          customer={this.state.customer}
          supporter={this.state.supporter}
        />
        {assignButton}
        {setRemoveSupporter}
        {closeButton}
        {commentForm}
        <CommentsList
          comments={this.state.comments}
        />
      </div>
    );
  }

  assignToSelf() {
    axios({
      method: 'get',
      url: `${baseUrl}/tickets/${this.props.match.params.id}/assign`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  markAsClosed() {
    axios({
      method: 'put',
      url: `${baseUrl}/tickets/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      data: {
        status: 'closed',
        title: this.state.ticket.title,
        description: this.state.ticket.description,
        supporter_id: this.state.ticket.supporter_id
      }
    }).then((response) => {
      console.log(response);
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  setSupporter() {
    //TODO
  }

  removeSupporter() {
    confirmAlert({
      title: 'Unassign',
      message: `Are you sure you want to unassign this ticket from ${this.state.supporter}?`,
      confirmLabel: 'Yes',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        axios({
          method: 'put',
          url: `${baseUrl}/tickets/${JSON.parse(this.state.ticket.id)}/removesupport`,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
          data: {
            title: this.state.ticket.title,
            description: this.state.ticket.description,
            status: this.state.ticket.status
          }
        }).then((response) => {
          console.log(response);
          this.setState({ supporter: 'none' });
          window.location.reload();
        });
      }
    });
  }
}

Ticket.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Ticket;
