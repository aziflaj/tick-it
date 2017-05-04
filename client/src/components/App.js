import React, { Component } from 'react';
import axios from 'axios';

import baseUrl from '../config/constants';
import logo from './logo.svg';
import '../../styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    axios.get(`${baseUrl}/pages`).then((response) => {
      this.setState({ message: response.data.message });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.message}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="btn btn-primary">Hello</button>
      </div>
    );
  }
}

export default App;
