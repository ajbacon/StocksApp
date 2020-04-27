const getApiData = async () => {
  let url = `https://finnhub.io/api/v1/quote?symbol=BA&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;
  const res = await window.fetch(url);
  const data = await res.json();

  return data;
};

const onClickEvent = () => {
  const responseData = getApiData();
  console.log(responseData);
};

onClickEvent();

//https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=HE2XVCX2F9X3V8M1&symbols=MSFT,AAPL,FB

//https://cloud.iexapis.com/stable/stock/twtr/quote?token=pk_40756e5fcd174462a568139fcda8121e

// /https://cloud.iexapis.com/stable/stock/aapl/news?token=pk_40756e5fcd174462a568139fcda8121e
