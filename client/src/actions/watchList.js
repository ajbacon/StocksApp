import axios from 'axios';

import { SET_WATCH_LIST } from './types';

// add a watch item
export const addWatchItem = (companyData) => async (dispatch) => {
  const { symbol, description } = companyData;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    symbol,
    description,
  };

  try {
    await axios.post('/api/watchitems', body, config);
    dispatch(getWatchList());
  } catch (err) {
    console.log(err.data);
  }
};
// get watch items list
export const getWatchList = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/watchitems');

    const payload = res.data.map((item) => {
      return {
        ...item,
        newsData: [],
        quoteData: {},
      };
    });

    dispatch({
      type: SET_WATCH_LIST,
      payload,
    });
  } catch (err) {
    console.log(err.data);
  }
};
