import React, { useEffect, useState } from 'react';
import Classes from './CompanyData.module.css';
// todo:
// change to async await?

const CompanyData = ({ companyData }) => {
  const [currentQuote, setCurrentQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = `https://finnhub.io/api/v1/quote?symbol=${companyData.symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentQuote([data]);
        setLoading(false);
      });
  }, [companyData.symbol]);

  const renderCurrent = () => {
    const { c, pc } = currentQuote[0];
    const delta = c - pc;
    const deltaPercent = delta / pc;
    const sign = delta < 0 ? '' : '+';

    const deltaStr = `${sign}${delta.toFixed(2)} (${sign}${deltaPercent.toFixed(
      2
    )})`;
    return (
      <div className={Classes.currentPrice}>
        <div style={{ fontSize: '4vw' }}>{currentQuote[0].c}</div>
        <div style={{ fontSize: '3vw', margin: '0 0 4px 10px' }}>
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
      {renderCurrent()}
      <div>Day Opening Price: {currentQuote[0].o}</div>
      <div>Day High Price: {currentQuote[0].h}</div>
      <div>Day Low Price: {currentQuote[0].l}</div>
      <div>Previous Closing Price: {currentQuote[0].pc}</div>
    </div>
  );
};

export default CompanyData;
