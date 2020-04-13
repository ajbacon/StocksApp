import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import Dashboard from './Dashboard';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Dashboard store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('<Dashboard />', () => {
  let wrapper;
  let component;

  it('renders the Dashboard page without crashing if the user is authenticated', () => {
    const initialState = {
      auth: { isAuthenticated: true },
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-dashboard');
    expect(component).toHaveLength(1);
  });
});
