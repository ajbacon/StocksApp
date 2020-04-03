import React, { useEffect, useState } from 'react';

// todo:
// change to async await?

const CompanyData = ({ companyData }) => {
  const [currentQuote, setCurrentQuote] = useState([]);

  useEffect(() => {
    let url = `https://finnhub.io/api/v1/quote?symbol=${companyData.symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCurrentQuote([data]);
      });
  }, [companyData.symbol]);

  return (
    <div>
      <h4>{companyData.description}</h4>
      <div>
        {currentQuote.length > 0 ? `Current Price: ${currentQuote[0].c}` : ''}
      </div>
      <div>
        {currentQuote.length > 0
          ? `Day Opening Price: ${currentQuote[0].o}`
          : ''}
      </div>
      <div>
        {currentQuote.length > 0 ? `Day High Price: ${currentQuote[0].h}` : ''}
      </div>
      <div>
        {currentQuote.length > 0 ? `Day Low Price: ${currentQuote[0].l}` : ''}
      </div>
      <div>
        {currentQuote.length > 0
          ? `Previous Closing Price: ${currentQuote[0].pc}`
          : ''}
      </div>
    </div>
  );
};

export default CompanyData;
