import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ticker from './Ticker'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dmitry's Crypto Ticker</h1>
        </header>
        <Ticker />
      </div>
    );
  }
}

export default App;
