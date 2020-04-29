import axios from 'axios';

import { ADD_WATCH_ITEM } from './types';

// add a watch item
export const addWatchItem = (symbol) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    symbol: companyData.symbol,
  };

  try {
    await axios.post('/api/watchitems', body, config);
    dispatch(getWatchList());
  } catch (err) {
    console.log(err.data);
  }
};
// get watch items list
export const getWatchList = (symbol) => async (dispatch) => {
  

  try {
    const res = await axios.get('/api/watchitems');
    setWatchItems(res.data);
    dispatch({
      type: GET_WATCH_LIST
      payload: res.data
    })
  } catch (err) {
    console.log(err.data);
  }
};
