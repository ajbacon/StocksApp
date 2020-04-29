import { GET_WATCH_LIST } from '../actions/types';

const initialState = {
  watchList: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_WATCH_LIST:
      return {
        ...state,
        watchList: payload,
      };
    default:
      return state;
  }
}
