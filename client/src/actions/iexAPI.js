import axios from 'axios';

import getAlphaVantageKey from '../utils/apiLoadBalancer';
import { SEARCH_QUOTE, SEARCH_QUOTE_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadSearchQuote = (symbol) => async (dispatch) => {
  delete axios.defaults.headers.common['x-auth-token'];
  try {
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${getAlphaVantageKey()}`;

    const res = await axios.get(url);
    let {
      '02. open': open,
      '03. high': high,
      '04. low': low,
      '05. price': price,
      '08. previous close': previous,
    } = res.data['Global Quote'];

    const data = {
      open: parseFloat(open),
      high: parseFloat(high),
      low: parseFloat(low),
      price: parseFloat(price),
      previous: parseFloat(previous),
    };

    dispatch({
      type: SEARCH_QUOTE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_QUOTE_ERROR,
    });
  }
  // reset defaut header
  setAuthToken(localStorage.token);
};
