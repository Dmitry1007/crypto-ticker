import React, { Component } from 'react';
import './Ticker.css'

class Ticker extends Component {
  render() {
    return (
      <div className="ticker">
        <div className="ticker-items">
          <span className="ticker-item">
            Bitcoin
          </span>
          <span className="ticker-item">
            Ethereum
          </span>
          <span className="ticker-item">
            DASH
          </span>
          <span className="ticker-item">
            LTC
          </span>
          <span className="ticker-item">
            Bitcoin
          </span>
          <span className="ticker-item">
            Ethereum
          </span>
          <span className="ticker-item">
            DASH
          </span>
          <span className="ticker-item">
            LTC
          </span>
        </div>
      </div>
    );
  }
}

export default Ticker;
