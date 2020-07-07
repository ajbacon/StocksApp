import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import WatchList from './WatchList';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<WatchList store={store} />)
    .dive()
    .dive()
    .dive();
  return wrapper;
};

describe('<WatchList />', () => {
  let wrapper;
  let component;

  it('renders loading bar before watchitems are retrieved', () => {
    // const initialState = {
    //   auth: { isAuthenticated: true },
    // };
    // wrapper = setup(initialState);
    // component = findByTestAttr(wrapper, 'component-loading-bar');
    // expect(component).toHaveLength(1);
  });
});
