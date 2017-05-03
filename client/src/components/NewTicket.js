import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

import baseUrl from '../helpers/Constants';

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
      //this.context.router.history.push(`/tickets/${response.data.user.username}`);
    });
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.onFormSubmit.bind(this)}>
        <h2 className="form-signin-heading">Enter you ticket information</h2>
        <div className="form-group">
          <label htmlFor="inputTitle" className="control-label col-sm-2">Title</label>
          <div class="col-sm-10">
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
          <div class="col-sm-10">
            <textarea id="inputDescription"
                      type="text"
                      className="form-control"
                      placeholder="title"
                      required
                      autoFocus
                      onChange={this.onDescriptionChange.bind(this)}
            ></textarea>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

NewTicket.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default NewTicket;
