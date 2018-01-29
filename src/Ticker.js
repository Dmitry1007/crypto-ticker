import React, { Component } from 'react';
import './Ticker.css'
import $ from 'jquery'
import { Btc, Eth, Xrp, Bch, Ada, Str, Ltc, Neo, Eos, Xem, Iota, Dash, Xmr, Lsk, Etc, Dcr, Doge, Ppc } from 'react-cryptocoins';
import CCC from './ccc-streamer-utilities';

import io from 'socket.io-client';
const socket = io.connect('https://streamer.cryptocompare.com/');
const Subscription = [
        '5~CCCAGG~BTC~USD',
        '5~CCCAGG~ETH~USD',
        '5~CCCAGG~XRP~USD',
        '5~CCCAGG~BCH~USD',
        '5~CCCAGG~ADA~USD',
        '5~CCCAGG~XLM~USD',
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
        '5~CCCAGG~DOGE~USD',
        '5~CCCAGG~PPC~USD'
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

  handleMouseEnter = () => {
    console.log("Mouse In DA House")
    $('.ticker').stop()
  }

  render() {
    let btcPrice;
    let ethPrice;
    let xrpPrice;
    let bchPrice;
    let adaPrice;
    let ltcPrice;
    let xlmPrice;
    let neoPrice;
    let eosPrice;
    let xemPrice;
    let iotPrice;
    let dashPrice;
    let xmrPrice;
    let etcPrice;
    let lskPrice;
    let dcrPrice;
    let dogePrice;
    let ppcPrice;
    this.state.cryptos.filter((obj) => {
      if(obj.FROMSYMBOL === 'BTC') {
        btcPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'ETH') {
        ethPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'XRP') {
        xrpPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'BCH') {
        bchPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'ADA') {
        adaPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'LTC') {
        ltcPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'XLM') {
        xlmPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'NEO') {
        neoPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'EOS') {
        eosPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'XEM') {
        xemPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'IOT') {
        iotPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'DASH') {
        dashPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'XMR') {
        xmrPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'ETC') {
        etcPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'LSK') {
        lskPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'DCR') {
        dcrPrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'DOGE') {
        dogePrice = obj.PRICE
      } else if (obj.FROMSYMBOL === 'PPC') {
        ppcPrice = obj.PRICE
      }
    });

    return (
      <div className="tickerWrapper" onMouseEnter={this.handleMouseEnter} >
        <button type='button' onClick={ this.handleStopStream } className='btn btn-danger'>Stop Stream</button>
        <ul className="ticker">
          <li><Btc color={'Orange'} /> Bitcoin <span>$ { btcPrice }</span></li>
          <li><Eth color={'DarkGrey'} /> Ethereum <span>$ { ethPrice }</span></li>
          <li><Xrp color={'Aqua'} /> Ripple <span>$ { xrpPrice }</span></li>
          <li><Bch color={'Peru'} /> Bitcoin Cash <span>$ { bchPrice }</span></li>
          <li><Ada color={'white'} /> Cardano <span>$ { adaPrice }</span></li>
          <li><Ltc color={'Grey'} /> LiteCoin <span>$ { ltcPrice }</span></li>
          <li><Str color={'Aquamarine'}/> Steller <span>$ { xlmPrice }</span></li>
          <li><Neo color={'Lime'}/> NEO <span>$ { neoPrice }</span></li>
          <li><Eos /> EOS <span>$ { eosPrice }</span></li>
          <li><Xem color={'Coral'}/> NEM <span>$ { xemPrice }</span></li>
          <li><Iota color={'white'}/> IOTA <span>$ { iotPrice }</span></li>
          <li><Dash color={'DarkTurquoise'}/> DASH <span>$ { dashPrice }</span></li>
          <li><Xmr color={'DarkOrange'}/> Monero <span>$ { xmrPrice }</span></li>
          <li><Etc color={'Olive'} /> Ethereum Classic  <span>$ { etcPrice }</span></li>
          <li><Lsk color={'MidnightBlue'}/> Lisk <span>$ { lskPrice }</span></li>
          <li><Dcr color={'MediumAquaMarine'}/> Decred  <span>$ { dcrPrice }</span></li>
          <li><Doge color={'orange'}/> Dogecoin <span>$ { dogePrice }</span></li>
          <li><Ppc color={'Green'}/> PeerCoin <span>$ { ppcPrice }</span></li>
        </ul>
      </div>
    );
  }
}

export default Ticker;
