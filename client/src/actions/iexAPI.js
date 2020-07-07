import axios from 'axios';
import getAlphaVantageKey from '../utils/apiLoadBalancer';
import { SEARCH_QUOTE, SEARCH_QUOTE_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';

const moment = require('moment');

const globalQuoteQuery = (symbol) => {
  let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${getAlphaVantageKey()}`;
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
      const globalQuote = parseQuoteData(globalQuoteRes.data);
      // const companyNewsRes =
    })
  );

  // reset defaut header
  setAuthToken(localStorage.token);
};
