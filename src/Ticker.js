import React, { Component } from 'react';
import './Ticker.css'
import $ from 'jquery'
import { Btc, Eth, Xrp, Bch, Ada, Str, Ltc, Neo, Eos, Xem, Iota, Dash, Xmr, Lsk, Etc, Dcr, Vrc, Steem, Bcn } from 'react-cryptocoins';


$(document).ready(function(){
    var speed = 5;
    var items, ticker = $('.ticker');
    var width = 0;
    ticker.children().each(function(){
        width += $(this).outerWidth(true);
    });
    ticker.css('width', width);
    scroll();
    function scroll(){
        items = ticker.children();
        var scrollWidth = items.eq(0).outerWidth();
        ticker.animate({'left' : 0 - scrollWidth}, scrollWidth * 100 / speed, 'linear', changeFirst);
    }
    function changeFirst(){
        ticker.append(items.eq(0).remove()).css('left', 0);
        scroll();
    }
});

class Ticker extends Component {
  render() {
    return (
      <div className="tickerWrapper">
        <ul className="ticker">
          <li><Btc color={'Orange'} /> Bitcoin</li>
          <li><Eth color={'DarkGrey'} /> Ethereum</li>
          <li><Xrp color={'Aqua'} /> Ripple</li>
          <li><Bch color={'Peru'} /> Bitcoin Cash</li>
          <li><Ada color={'MediumTurqoise'} /> Cardano</li>
          <li><Ltc color={'Grey'} /> LiteCoin</li>
          <li><Str color={'Aquamarine'}/> Steller</li>
          <li><Neo color={'Lime'}/> NEO</li>
          <li><Eos /> EOS</li>
          <li><Xem color={'Coral'}/> NEM</li>
          <li><Iota color={''}/> IOTA</li>
          <li><Dash color={'DarkTurquoise'}/> DASH</li>
          <li><Xmr color={'DarkOrange'}/> Monero</li>
          <li><Etc color={'Olive'} /> Ethereum Classic</li>
          <li><Lsk color={'MidnightBlue'}/> Lisk</li>
          <li><Dcr color={'MediumAquaMarine'}/> Decred</li>
          <li><Vrc color={'DeepSkyBlue'}/> Vericoin</li>
          <li><Steem color={'LightBlue'}/> Steem</li>
          <li><Bcn /> Bytecoin</li>
        </ul>
      </div>
    );
  }
}

export default Ticker;
