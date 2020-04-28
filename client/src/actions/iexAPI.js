import axios from 'axios';

import getAlphaVantageKey from '../../utils/apiLoadBalancer';
import { SEARCH_QUOTE, SEARCH_QUOTE_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadSearchQuote = (symbol) => async (dispatch) => {
  delete axios.defaults.headers.common['x-auth-token'];
  try {
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${getAlphaVantageKey()}`;

    const res = await axios.get(url);

    dispatch({
      type: SEARCH_QUOTE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_QUOTE_ERROR,
    });
  }
  // reset defaut header
  setAuthToken(localStorage.token);
};
