import moxios from 'moxios';
import thunk from 'redux-thunk';

import rootReducer from '../../../reducers';
import { createStore } from 'redux';

const middleware = [thunk];

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};
