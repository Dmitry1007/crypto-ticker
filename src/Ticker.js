import React, { Component } from 'react';
import './Ticker.css'
import $ from 'jquery'
import { Btc, Eth, Xrp, Bch, Ada, Str, Ltc, Neo, Eos, Xem, Iota, Dash, Xmr, Lsk, Etc, Dcr, Doge, Ppc } from 'react-cryptocoins';
import CCC from './ccc-streamer-utilities';
import Subscriptions from './Subscriptions'

import io from 'socket.io-client';
const socket = io.connect('https://streamer.cryptocompare.com/');
const cryptoScaffold = {
        BTC:  { PRICE: '0' },
        ETH:  { PRICE: '0' },
        XRP:  { PRICE: '0' },
        BCH:  { PRICE: '0' },
        ADA:  { PRICE: '0' },
        XLM:  { PRICE: '0' },
        LTC:  { PRICE: '0' },
        NEO:  { PRICE: '0' },
        EOS:  { PRICE: '0' },
        XEM:  { PRICE: '0' },
        IOT:  { PRICE: '0' },
        DASH: { PRICE: '0' },
        XMR:  { PRICE: '0' },
        LSK:  { PRICE: '0' },
        ETC:  { PRICE: '0' },
        DCR:  { PRICE: '0' },
        DOGE: { PRICE: '0' },
        PPC:  { PRICE: '0' }
      }

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollSpeed: 5,
      currentPrice: {},
      cryptos: cryptoScaffold
    }
  }

  componentWillMount = () => {
   socket.emit('SubAdd', { subs: Subscriptions });
    const that = this;
    socket.on('m', (message) => {
      const messageType = message.substring(0, message.indexOf('~'));
      let res = {};
      if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
        res = CCC.CURRENT.unpack(message);
        that.dataUnpack(res);
      }
    });
  }

  componentDidMount = () => {
    this.scrollTicker()
  }

  handleStopStream = () => {
    socket.emit('SubRemove', { subs: Subscriptions } );
  }

  dataUnpack = (data) => {
    const currentPrice = this.state.currentPrice;
    const from = data.FROMSYMBOL;
    const to = data.TOSYMBOL;
    const pair = from + to;

    // Do NOT use dot notionation for currentPrice[pair]
    if (!currentPrice.hasOwnProperty(pair)) {
      currentPrice[pair] = {};
    }

    for (const key in data) {
      currentPrice[pair][key] = data[key];
    }

    let currentCryptoObject = currentPrice[pair]

    currentCryptoObject.CHANGE24HOURPCT = (
      (currentCryptoObject.PRICE - currentCryptoObject.OPEN24HOUR) /
      currentCryptoObject.OPEN24HOUR * 100).toFixed(2) + '%';

    let cryptos = this.state.cryptos
    currentCryptoObject.PRICE = Number(currentCryptoObject.PRICE).toLocaleString('en');

    // 1 = Price Up, 2 = Price Down, 4 = Price Unchanged
    if (currentCryptoObject.FLAGS === '1') {
      currentCryptoObject.PRICEDIRECTION = 'up';
    } else if (currentCryptoObject.FLAGS === '2') {
      currentCryptoObject.PRICEDIRECTION = 'down';
    } else if (currentCryptoObject.FLAGS === '4') {
      currentCryptoObject.PRICEDIRECTION = 'unchanged';
    }

    cryptos[from] = currentCryptoObject
    this.setState({ cryptos: cryptos })
  }

  scrollTicker = () => {
    const speed = this.state.scrollSpeed;
    let items;
    const ticker = $('.ticker');
    let width = 0;

    ticker.children().each(function(){
      width += $(this).outerWidth(true);
    });

    ticker.css('width', width);

    const scroll = () => {
      items = ticker.children();
      const scrollWidth = items.eq(0).outerWidth();
      ticker.animate(
        {'left' : 0 - scrollWidth},
        scrollWidth * 100 / speed,
        'linear', changeFirst
      );
    }

    const changeFirst = () => {
      ticker.append(items.eq(0).remove()).css('left', 0);
      scroll();
    }

    scroll();
  }

  handleMouseEnter = () => {
    console.log('Mouse In DA House')
    $('.ticker').stop()
  }

  handleMouseLeave = () => {
    console.log('Mouse Out DA House')
    this.scrollTicker()
  }

  render() {
    const cryptos = this.state.cryptos

    return (
      <div className="tickerWrapper" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
        <button type='button' onClick={ this.handleStopStream } className='btn btn-danger'>Stop Stream</button>
        <ul className="ticker">
          <li><Btc color={'Orange'} /> Bitcoin <span className={ cryptos.BTC.PRICEDIRECTION }>${ cryptos.BTC.PRICE }</span></li>
          <li><Eth color={'DarkGrey'} /> Ethereum <span className={ cryptos.ETH.PRICEDIRECTION }>${ cryptos.ETH.PRICE }</span></li>
          <li><Xrp color={'Aqua'} /> Ripple <span className={ cryptos.XRP.PRICEDIRECTION }>${ cryptos.XRP.PRICE }</span></li>
          <li><Bch color={'Peru'} /> Bitcoin Cash <span className={ cryptos.BCH.PRICEDIRECTION }>${ cryptos.BCH.PRICE }</span></li>
          <li><Ada color={'white'} /> Cardano <span className={ cryptos.ADA.PRICEDIRECTION }>${ cryptos.ADA.PRICE }</span></li>
          <li><Ltc color={'Grey'} /> LiteCoin <span className={ cryptos.LTC.PRICEDIRECTION }>${ cryptos.LTC.PRICE }</span></li>
          <li><Str color={'Aquamarine'}/> Steller <span className={ cryptos.XLM.PRICEDIRECTION }>${ cryptos.XLM.PRICE }</span></li>
          <li><Neo color={'Lime'}/> NEO <span className={ cryptos.NEO.PRICEDIRECTION }>${ cryptos.NEO.PRICE }</span></li>
          <li><Eos /> EOS <span className={ cryptos.EOS.PRICEDIRECTION }>${ cryptos.EOS.PRICE }</span></li>
          <li><Xem color={'Coral'}/> NEM <span className={ cryptos.XEM.PRICEDIRECTION }>${ cryptos.XEM.PRICE }</span></li>
          <li><Iota color={'white'}/> IOTA <span className={ cryptos.IOT.PRICEDIRECTION }>${ cryptos.IOT.PRICE }</span></li>
          <li><Dash color={'DarkTurquoise'}/> DASH <span className={ cryptos.DASH.PRICEDIRECTION }>${ cryptos.DASH.PRICE }</span></li>
          <li><Xmr color={'DarkOrange'}/> Monero <span className={ cryptos.XMR.PRICEDIRECTION }>${ cryptos.XMR.PRICE }</span></li>
          <li><Etc color={'Olive'} /> Ethereum Classic  <span className={ cryptos.ETC.PRICEDIRECTION }>${ cryptos.ETC.PRICE }</span></li>
          <li><Lsk color={'MidnightBlue'}/> Lisk <span className={ cryptos.LSK.PRICEDIRECTION }>${ cryptos.LSK.PRICE }</span></li>
          <li><Dcr color={'MediumAquaMarine'}/> Decred  <span className={ cryptos.DCR.PRICEDIRECTION }>${ cryptos.DCR.PRICE }</span></li>
          <li><Doge color={'orange'}/> Dogecoin <span className={ cryptos.DOGE.PRICEDIRECTION }>${ cryptos.DOGE.PRICE }</span></li>
          <li><Ppc color={'Green'}/> PeerCoin <span className={ cryptos.PPC.PRICEDIRECTION }>${ cryptos.PPC.PRICE }</span></li>
        </ul>
      </div>
    );
  }
}

export default Ticker;
