import React, { useEffect, useState } from 'react';

// todo:
// change to async await?

const CompanyData = ({ companyData }) => {
  const [currentQuote, setCurrentQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = `https://finnhub.io/api/v1/quote?symbol=${companyData.symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCurrentQuote([data]);
        setLoading(false);
      });
  }, [companyData.symbol]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h4>{companyData.description}</h4>
      <div>Current Price: {currentQuote[0].c}</div>
      <div>Day Opening Price: {currentQuote[0].o}</div>
      <div>Day High Price: {currentQuote[0].h}</div>
      <div>Day Low Price: {currentQuote[0].l}</div>
      <div>Previous Closing Price: {currentQuote[0].pc}</div>
    </div>
  );
};

export default CompanyData;
