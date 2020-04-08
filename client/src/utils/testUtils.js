import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../../../reducers';

const middleware = [thunk];

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};
