import { SEARCH_QUOTE, SEARCH_QUOTE_ERROR } from '../actions/types';

const initialState = {
  searchQuoteData: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_QUOTE:
      return {
        ...state,
        searchQuoteData: payload,
      };
    default:
      return state;
  }
}
