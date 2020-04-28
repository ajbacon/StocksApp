import { SEARCH_QUOTE, SEARCH_QUOTE_ERROR } from '../actions/types';

const initialState = {
  searchQuoteData: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_QUOTE:
      return {
        ...state,
        searchQuoteData: payload,
        loading: false,
      };
    default:
      return state;
  }
}
