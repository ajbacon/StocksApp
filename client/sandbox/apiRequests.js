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
