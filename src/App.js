import React, { Component } from 'react';
import githubLogo from './github-logo.svg';
import './App.css';
import Ticker from './Ticker'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Dmitry1007">
            <img src={githubLogo} className="App-logo" alt="github-logo" />
          </a>
          <h1 className="App-title">Dmitry's Crypto Ticker</h1>
        </header>
        <Ticker />
      </div>
    );
  }
}

export default App;
