import axios from 'axios';
import { getAlphaVantageKey, getFinnhubKey } from '../utils/apiLoadBalancer';
import { SEARCH_QUOTE, SEARCH_QUOTE_ERROR, SET_WATCH_LIST } from './types';
import setAuthToken from '../utils/setAuthToken';

const moment = require('moment');

const globalQuoteQuery = (symbol) => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${getAlphaVantageKey()}`;
  return axios.get(url);
};

const companyNewsQuery = (symbol) => {
  const today = moment().format('YYYY-MM-DD');
  const oneMonthAgo = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${oneMonthAgo}&to=${today}&token=${getFinnhubKey()}`;
  return axios.get(url);
};

const parseQuoteData = (data) => {
  let {
    '02. open': open,
    '03. high': high,
    '04. low': low,
    '05. price': price,
    '08. previous close': previous,
  } = data['Global Quote'];

  return {
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    price: parseFloat(price),
    previous: parseFloat(previous),
  };
};

export const loadSearchQuote = (symbol) => async (dispatch) => {
  delete axios.defaults.headers.common['x-auth-token'];
  try {
    const res = await globalQuoteQuery(symbol);
    const payload = parseQuoteData(res.data);
    console.log();
    dispatch({
      type: SEARCH_QUOTE,
      payload,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_QUOTE_ERROR,
    });
  }
  // reset defaut header
  setAuthToken(localStorage.token);
};

export const loadWatchListData = (watchList) => async (dispatch) => {
  delete axios.defaults.headers.common['x-auth-token'];

  const payload = await Promise.all(
    watchList.map(async (item) => {
      const globalQuoteRes = await globalQuoteQuery(item.symbol);
      item.quoteData = parseQuoteData(globalQuoteRes.data);
      const companyNewsRes = await companyNewsQuery(item.symbol);
      item.newsData = companyNewsRes.data.slice(0, 5);
      return item;
    })
  );

  console.log(payload);

  dispatch({
    type: SET_WATCH_LIST,
    payload,
  });

  // reset defaut header
  setAuthToken(localStorage.token);
};
