import { SET_WATCH_LIST } from '../actions/types';

const initialState = {
  watchListData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_WATCH_LIST:
      return {
        ...state,
        watchListData: payload,
      };
    default:
      return state;
  }
}
