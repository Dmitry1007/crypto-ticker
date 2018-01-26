import React, { Component } from 'react';
import './Ticker.css'

class Ticker extends Component {
  render() {
    return (
      <div class="ticker">
        <div class="ticker-items">
          <span class="ticker-item">
            Bitcoin
          </span>
          <span class="ticker-item">
            Ethereum
          </span>
          <span class="ticker-item">
            DASH
          </span>
          <span class="ticker-item">
            LTC
          </span>
        </div>
      </div>
    );
  }
}

export default Ticker;
