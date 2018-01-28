import React, { Component } from 'react';
import './Ticker.css'
import $ from 'jquery'
import { Btc, Eth, Xrp, Bch, Ada, Str, Ltc, Neo, Eos, Xem, Iota, Dash, Xmr, Lsk, Etc, Dcr, Vrc, Steem, Bcn } from 'react-cryptocoins';
import CCC from './ccc-streamer-utilities';

import io from 'socket.io-client';
const socket = io.connect('https://streamer.cryptocompare.com/');
const Subscription = [
        '5~CCCAGG~BTC~USD',
        '5~CCCAGG~ETH~USD',
        '5~CCCAGG~XRP~USD',
        '5~CCCAGG~BCH~USD',
        '5~CCCAGG~ADA~USD',
        '5~CCCAGG~STR~USD',
        '5~CCCAGG~LTC~USD',
        '5~CCCAGG~NEO~USD',
        '5~CCCAGG~EOS~USD',
        '5~CCCAGG~XEM~USD',
        '5~CCCAGG~IOT~USD',
        '5~CCCAGG~DASH~USD',
        '5~CCCAGG~XMR~USD',
        '5~CCCAGG~LSK~USD',
        '5~CCCAGG~ETC~USD',
        '5~CCCAGG~DCR~USD',
        '5~CCCAGG~VRC~USD',
        '5~CCCAGG~STEEM~USD',
        '5~CCCAGG~BCN~USD'
      ]

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollSpeed: 5,
      currentPrice: {},
      cryptos: []
    }
  }

  componentDidMount = () => {
   socket.emit('SubAdd', { subs: Subscription });
    const that = this;
    socket.on('m', (message) => {
      const messageType = message.substring(0, message.indexOf('~'));
      let res = {};
      if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
        res = CCC.CURRENT.unpack(message);
        that.dataUnpack(res);
      }
    });

    this.scrollTicker()
  }

  handleStopStream = () => {
    socket.emit('SubRemove', { subs: Subscription } );
  }

  dataUnpack = (data) => {
    const currentPrice = this.state.currentPrice;
    const from = data.FROMSYMBOL;
    const to = data.TOSYMBOL;
    // const fsym = CCC.STATIC.CURRENCY.getSymbol(from);
    const tsym = CCC.STATIC.CURRENCY.getSymbol(to);
    const pair = from + to;

    // Do NOT use dot notionation for currentPrice[pair]
    if (!currentPrice.hasOwnProperty(pair)) {
      currentPrice[pair] = {};
    }

    for (const key in data) {
      currentPrice[pair][key] = data[key];
    }

    if (currentPrice[pair].LASTTRADEID) {
      currentPrice[pair].LASTTRADEID =
      parseInt(currentPrice[pair].LASTTRADEID, 10).toFixed(0);
    }

    currentPrice[pair].CHANGE24HOUR = CCC.convertValueToDisplay(
        tsym, (currentPrice[pair].PRICE - currentPrice[pair].OPEN24HOUR)
      );

    currentPrice[pair].CHANGE24HOURPCT = (
      (currentPrice[pair].PRICE - currentPrice[pair].OPEN24HOUR) /
      currentPrice[pair].OPEN24HOUR * 100).toFixed(2) + '%';

    // Check cryptos array for like objects and replace each crypto with updated version
    const indexOfCrypto = this.state.cryptos.indexOf(currentPrice[pair]);
    if (indexOfCrypto === -1) {
      this.state.cryptos.push(currentPrice[pair]);
    } else {
      this.state.cryptos[indexOfCrypto] = currentPrice[pair];
    }
    console.log(currentPrice[pair])
    this.setState({ cryptos: this.state.cryptos });
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

  render() {
    let btcPrice;
    let ethPrice;
    let xrpPrice;
    this.state.cryptos.filter((obj) => {
      if(obj.FROMSYMBOL === 'BTC') {
        btcPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'ETH') {
        ethPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'XRP') {
        xrpPrice = obj.PRICE
      }
    });

    return (
      <div className="tickerWrapper" >
        <button type='button' onClick={ this.handleStopStream } className='btn btn-danger'>Stop Stream</button>
        <ul className="ticker">
          <li><Btc color={'Orange'} /> Bitcoin <span>{ btcPrice }</span></li>
          <li><Eth color={'DarkGrey'} /> Ethereum <span>{ ethPrice }</span></li>
          <li><Xrp color={'Aqua'} /> Ripple <span>{ xrpPrice }</span></li>
          <li><Bch color={'Peru'} /> Bitcoin Cash</li>
          <li><Ada color={'white'} /> Cardano</li>
          <li><Ltc color={'Grey'} /> LiteCoin</li>
          <li><Str color={'Aquamarine'}/> Steller</li>
          <li><Neo color={'Lime'}/> NEO</li>
          <li><Eos /> EOS</li>
          <li><Xem color={'Coral'}/> NEM</li>
          <li><Iota color={'white'}/> IOTA</li>
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
