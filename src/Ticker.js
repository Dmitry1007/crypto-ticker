import React, { Component } from 'react';
import './Ticker.css'
import $ from 'jquery'
import { Btc, Xrp, Ltc, Dash, Lsk, Eth, Fct, Ada } from 'react-cryptocoins';


$(document).ready(function(){
    var speed = 5;
    var items, scroller = $('.scroller');
    var width = 0;
    scroller.children().each(function(){
        width += $(this).outerWidth(true);
    });
    scroller.css('width', width);
    scroll();
    function scroll(){
        items = scroller.children();
        var scrollWidth = items.eq(0).outerWidth();
        scroller.animate({'left' : 0 - scrollWidth}, scrollWidth * 100 / speed, 'linear', changeFirst);
    }
    function changeFirst(){
        scroller.append(items.eq(0).remove()).css('left', 0);
        scroll();
    }
});

class Ticker extends Component {
  render() {
    return (
      <div className="scrollerWrapper">
        <ul className="scroller">
          <li><Btc color={'orange'} /> Bitcoin</li>
          <li><Eth /> Ethereum</li>
          <li><Xrp /> Ripple</li>
          <li><Ltc /> LiteCoin</li>
          <li><Dash /> DASH</li>
          <li><Lsk /> LISK</li>
          <li><Fct /> Factom</li>
          <li><Ada /> Cardano</li>
        </ul>
      </div>
    );
  }
}

export default Ticker;
