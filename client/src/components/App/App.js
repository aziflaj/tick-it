import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    let baseUrl = '';
    if (process.env.ENV === 'development') {
      baseUrl = 'http://localhost:5000';
    }
    axios.get(`${baseUrl}/api/pages`).then((response) => {
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
