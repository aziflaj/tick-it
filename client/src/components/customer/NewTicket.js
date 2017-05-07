import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import baseUrl from '../../config/constants';
import '../../styles.css';

class NewTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${baseUrl}/tickets`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      data: {
        title: this.state.title,
        description: this.state.description
      }
    }).then((response) => {
      console.log(response);
      this.context.router.history.push(`/tickets/${response.data.id}`);
    });
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null) {
      this.context.router.history.push('/');
    }
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.onFormSubmit.bind(this)}>
        <h2 className="form-signin-heading">Enter you ticket information</h2>
        <div className="form-group">
          <label htmlFor="inputTitle" className="control-label col-sm-2">Title</label>
          <div className="col-sm-10">
            <input id="inputTitle"
                   type="text"
                   className="form-control"
                   required
                   autoFocus
                   onChange={this.onTitleChange.bind(this)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputDescription" className="control-label col-sm-2">Description</label>
          <div className="col-sm-10">
            <textarea id="inputDescription"
                      type="text"
                      className="form-control"
                      required
                      autoFocus
                      onChange={this.onDescriptionChange.bind(this)}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

NewTicket.contextTypes = {
  router: PropTypes.object.isRequired
}

export default NewTicket;