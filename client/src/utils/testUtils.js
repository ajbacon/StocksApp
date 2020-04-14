/* istanbul ignore file */
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

const middleware = [thunk];

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};

export const setup = (Component, props = {}, state = null) => {
  const wrapper = shallow(<Component {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};
export const findByTestAttr = (wrapper, testAttr) => {
  return wrapper.find(`[data-test="${testAttr}"]`);
};

export const integrationSetup = (Component, initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  const wrapper = mount(
    <Provider store={store}>
      <Component />
    </Provider>
  );
  return { wrapper, store };
};
