import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

import { Typeahead } from 'react-typeahead';

import TicketItem from './TicketItem';
import CommentsList from '../comments/CommentsList';
import NewComment from '../comments/NewComment';
import { apiCall } from '../../helpers/api';

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
      selected: '',
      comments: []
    };
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null) {
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    apiCall(`tickets/${this.props.match.params.id}`, 'get').then(response => {
      const data = response.data;
      this.setState({ ticket: data.ticket.ticket,
                      comments: data.ticket.comments,
                      supporter: data.supporter,
                      customer: data.customer
                    });
      if (typeof this.state.supporter === 'undefined') {
        this.setState({ supporter: 'none' });
      }
    });
  }

  assignToSelf() {
    apiCall(`tickets/${this.props.match.params.id}/assign`, 'get').then(response => {
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  markAsClosed() {
    const data = {
      status: 'closed',
      title: this.state.ticket.title,
      description: this.state.ticket.description,
      supporter_id: this.state.ticket.supporter_id
    };

    apiCall(`tickets/${this.props.match.params.id}`, 'put', data).then(response => {
      if (response.data.status === 'ok') {
        window.location.reload();
      }
    });
  }

  onSearchTermChange(e) {
    apiCall(`supporters/search?term=${e.target.value}`, 'get').then(response => {
      this.setState({ suggestions: response.data.supporters.map(item => item.username) });
    });
  }

  setSupporter() {
    this.setState({ supporter: this.state.selected });
    confirmAlert({
      title: 'Assigning ticket',
      message: `Are you sure you want to assign this ticket to ${this.state.selected}?`,
      confirmLabel: 'Yes',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        const data = {
          title: this.state.ticket.title,
          description: this.state.ticket.description,
          status: this.state.ticket.status,
          supporter: this.state.supporter
        };

        apiCall(`tickets/${JSON.parse(this.state.ticket.id)}/setsupport`, 'put', data).then(response => {
          window.location.reload();
        });
      },
      onCancel: () => {
        this.setState({ supporter: 'none' });
      }
    });
  }

  removeSupporter() {
    confirmAlert({
      title: 'Unassign',
      message: `Are you sure you want to unassign this ticket from ${this.state.supporter}?`,
      confirmLabel: 'Yes',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        const data = {
          title: this.state.ticket.title,
          description: this.state.ticket.description,
          status: this.state.ticket.status
        };

        apiCall(`tickets/${JSON.parse(this.state.ticket.id)}/removesupport`, 'put', data).then(response => {
          this.setState({ supporter: 'none' });
          window.location.reload();
        });
      }
    });
  }

  onSelectSupporter(e) {
    this.setState({ selected: e });
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
    if (this.state.supporter === 'none' && user.role === 'supporter') {
      assignButton = (
        <button className="btn btn-primary" onClick={this.assignToSelf.bind(this)}>
          Assign to self
        </button>
      );
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
              maxVisible={8}
              onKeyDown={this.onSearchTermChange.bind(this)}
              onOptionSelected={this.onSelectSupporter.bind(this)}
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
}

Ticket.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Ticket;
