import React, { Component } from 'react';
import './Ticker.css'
import $ from 'jquery'


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
          <li><img src="http://placehold.it/100x50" alt="blah" />Bitcoin</li>
          <li><img src="http://placehold.it/100x50" alt="blah" />LiteCoin</li>
          <li><img src="http://placehold.it/100x50" alt="blah" />DASH</li>
          <li><img src="http://placehold.it/100x50" alt="blah" />LISK</li>
          <li><img src="http://placehold.it/100x50" alt="blah" />Factom</li>
          <li><img src="http://placehold.it/100x50" alt="blah" />Ethereum</li>
          <li><img src="http://placehold.it/100x50" alt="blah" />Steller</li>
        </ul>
      </div>
    );
  }
}

export default Ticker;
