import React, { useEffect, useState } from 'react';
import Classes from './CompanyData.module.css';
// todo:
// change to async await?

const CompanyData = ({ companyData }) => {
  const [currentQuote, setCurrentQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async () => {
      let url = `https://finnhub.io/api/v1/quote?symbol=${companyData.symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();
      setCurrentQuote([data]);
      setLoading(false);
    })();

    // fetch(url)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setCurrentQuote([data]);
    //     setLoading(false);
    //   });
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
    return (
      <div className={`col l6 m7 s12 ${Classes.currentPrice} ${textColor}`}>
        <b>
          <div style={{ fontSize: '40px' }}>{c.toFixed(2)}</div>
        </b>
        <div style={{ fontSize: '20px', margin: '0 0 4px 10px' }}>
          {deltaStr}
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
          <div className={Classes.infoItem}>
            Day Opening Price: {currentQuote[0].o}
          </div>
          <div className={Classes.infoItem}>
            Day High Price: {currentQuote[0].h}
          </div>
          <div className={Classes.infoItem}>
            Day Low Price: {currentQuote[0].l}
          </div>
          <div className={Classes.infoItem}>
            Previous Closing Price: {currentQuote[0].pc}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyData;
