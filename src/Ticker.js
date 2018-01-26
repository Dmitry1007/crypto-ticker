import React, { Component } from 'react';
import './Ticker.css'

class Ticker extends Component {
  render() {
    return (
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker__item">Letterpress chambray brunch.</div>
          <div className="ticker__item">Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.</div>
          <div className="ticker__item">Ugh PBR&B kale chips Echo Park.</div>
          <div className="ticker__item">Gluten-free mumblecore chambray mixtape food truck. </div>
          <div className="ticker__item">Authentic bitters seitan pug single-origin coffee whatever.</div>
          <div className="ticker__item">Letterpress chambray brunch.</div>
        </div>
      </div>
    );
  }
}

export default Ticker;
