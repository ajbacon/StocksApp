/* istanbul ignore file */
import React from 'react';
import axios from 'axios';

function TestComponent() {
  // const handleClick = async () => {
  //   let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=HE2XVCX2F9X3V8M1`;

  //   const res = await fetch(url);
  //   const data = await res.json();
  //   console.log(data);
  // };

  const handleClick = async () => {
    let url = `https://finnhub.io/api/v1/quote?symbol=BA&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;

    const res = await axios.get(url);
    console.log(res.data);
  };

  return (
    <div>
      <button onClick={() => handleClick()}>click Me</button>
    </div>
  );
}

export default TestComponent;

// `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=HE2XVCX2F9X3V8M1`
// `https://finnhub.io/api/v1/quote?symbol=BA&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
