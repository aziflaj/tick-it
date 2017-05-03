import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

import baseUrl from '../helpers/Constants';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
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

export default Profile
