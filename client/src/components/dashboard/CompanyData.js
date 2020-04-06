import React, { useEffect, useState } from 'react';
import Classes from './CompanyData.module.css';

const moment = require('moment');
// todo:
// change to async await?

const CompanyData = ({ companyData }) => {
  const [currentQuote, setCurrentQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log('here1');
    const storageCurrentQuoteData = JSON.parse(
      localStorage.getItem('currentQuoteData')
    );

    if (storageCurrentQuoteData) {
      setCurrentQuote([storageCurrentQuoteData]);
      setLoading(false);
      // console.log(currentQuote[0]);
      // const timestamp = new Date(currentQuote[0].t);
      // const dateStr = timestamp.toLocaleDateString('en-UK');
      // const timeStr = timestamp.toLocaleTimeString('en-UK');
      // console.log(dateStr);
      // console.log(timeStr);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log('here2');
    localStorage.setItem('companyData', JSON.stringify(companyData));

    (async () => {
      let url = `https://finnhub.io/api/v1/quote?symbol=${companyData.symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();
      setCurrentQuote([data]);
      localStorage.setItem('currentQuoteData', JSON.stringify(data));
      setLoading(false);
    })();
  }, [companyData.symbol]);

  const renderCurrent = () => {
    // this should probably be its own component at some point
    const { c, pc } = currentQuote[0];
    const delta = c - pc;
    const deltaPercent = delta / pc;
    const sign = delta < 0 ? '' : '+';
    const textColor = delta < 0 ? Classes.redText : Classes.greenText;

    const deltaStr = `${sign}${delta.toFixed(2)} (${sign}${deltaPercent.toFixed(
      2
    )}%)`;

    console.log(moment.unix(currentQuote[0].t).format('LLL'));
    // const timestamp = new Date(1586164688 * 1000);
    // const dateStr = timestamp.toLocaleDateString('en-UK');
    // const timeStr = timestamp.toLocaleTimeString('en-UK');
    // console.log(dateStr);
    // console.log(timeStr);
    return (
      <div className={`col l6 m7 s12`}>
        <div className='row'>
          <div className={`col s12 ${Classes.currentPrice} ${textColor}`}>
            <div style={{ fontSize: '40px', margin: '0 5px 0 0' }}>
              {c.toFixed(2)}
            </div>
            <div style={{ fontSize: '20px', margin: '0 0 6px 0' }}>
              {deltaStr}
            </div>
          </div>
          <div className={`col s12 ${Classes.quoteTimestamp}`}>
            Last updated: {moment.unix(currentQuote[0].t).format('LLL')}
          </div>
        </div>
      </div>
    );
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h4 style={{ padding: '5px', borderBottom: '1px solid grey' }}>
        {companyData.description}
      </h4>

      <div className='row'>
        {renderCurrent()}
        <div className='col l6 m5 s10'>
          <div className={`${Classes.infoItem}`}>
            <div>Day Opening Price: </div>
            <div className='right'>{currentQuote[0].o.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Day High Price:</div>
            <div>{currentQuote[0].h.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Day Low Price:</div>
            <div>{currentQuote[0].l.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Previous Closing Price:</div>
            <div>{currentQuote[0].pc.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyData;
