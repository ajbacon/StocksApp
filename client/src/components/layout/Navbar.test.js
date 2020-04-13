import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import Navbar from './Navbar';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Navbar store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('<Navbar />', () => {
  let wrapper;
  let component;

  it('renders the Navbar page without crashing', () => {
    const initialState = {
      auth: { isAuthenticated: false },
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-navbar');
    expect(component).toHaveLength(1);
  });
});
