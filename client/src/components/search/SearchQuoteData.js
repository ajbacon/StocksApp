import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import LoadingBar from '../layout/LoadingBar';
import Classes from './SearchQuoteData.module.css';

//redux
import { connect } from 'react-redux';
import { loadSearchQuote } from '../../actions/iexAPI';

const moment = require('moment');

const SearchQuoteData = ({ companyData }) => {
  const [currentQuote, setCurrentQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storageCurrentQuoteData = JSON.parse(
      localStorage.getItem('currentQuoteData')
    );
    if (storageCurrentQuoteData) {
      setCurrentQuote([storageCurrentQuoteData]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {}, [companyData]);

  const watchItemClickHandler = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      symbol: companyData.symbol,
    };
    const res = await axios.post('/api/watchitems', body, config);
    console.log(res);
  };

  const renderCurrentPrice = () => {
    // this should probably be its own component at some point
    let {
      '02. open': open,
      '03. high': high,
      '04. low': low,
      '05. price': price,
      '08. previous close': previous,
    } = currentQuote[0];
    open = parseFloat(open);
    high = parseFloat(high);
    low = parseFloat(low);
    price = parseFloat(price);
    previous = parseFloat(previous);

    const delta = price - previous;
    const deltaPercent = (delta / previous) * 100;
    const sign = delta < 0 ? '' : '+';
    const textColor = delta < 0 ? Classes.redText : Classes.greenText;

    const deltaStr = `${sign}${delta.toFixed(2)} (${sign}${deltaPercent.toFixed(
      2
    )}%)`;
    return (
      <Fragment>
        <div className={`col l6 m7 s12`}>
          <div className='row'>
            <div className={`col s12 ${Classes.currentPrice} ${textColor}`}>
              <div style={{ fontSize: '40px', margin: '0 5px 0 0' }}>
                <b>{price.toFixed(2)}</b>
              </div>
              <div style={{ fontSize: '20px', margin: '0 0 6px 0' }}>
                {deltaStr}
              </div>
            </div>
            <div className={`col s12 ${Classes.quoteTimestamp}`}>
              Last updated: {moment().format('LLL')}
            </div>
          </div>
        </div>
        <div className='col l6 m5 s10'>
          <div className={`${Classes.infoItem}`}>
            <div>Day Opening Price: </div>
            <div className='right'>{open.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Day High Price:</div>
            <div>{high.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Day Low Price:</div>
            <div>{low.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Previous Closing Price:</div>
            <div>{previous.toFixed(2)}</div>
          </div>
        </div>
      </Fragment>
    );
  };

  return loading ? (
    <LoadingBar />
  ) : (
    <div data-test='component-company-data'>
      <div
        className={`${Classes.companyHeader} `}
        style={{ borderBottom: '1px solid grey' }}
      >
        <div className={`col s9 ${Classes.companyTitle}`}>
          {companyData.description}
        </div>
        <div className={`col s3 ${Classes.watchBtnContainer}`}>
          <button
            className={
              'btn btn-small waves-effect waves-light white black-text'
            }
            onClick={() => watchItemClickHandler()}
          >
            Watch
          </button>
        </div>
      </div>

      <div className='row'>{renderCurrentPrice()}</div>
    </div>
  );
};

export default SearchQuoteData;
