import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import '../styles.css';
import baseUrl from '../config/constants';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null) {
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    axios.get(`${baseUrl}/users/${this.props.match.params.username}`).then((response) => {
      this.setState({ user: response.data.user });
    });
  }

  render() {
    return (
      <p> Welcome, to your profile {this.state.user.full_name}</p>
    )
  }
}

Profile.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Profile;
