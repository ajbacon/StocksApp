import React from './node_modules/react';
import { shallow } from './node_modules/enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import Home from './Home';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Home store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('<Home />', () => {
  let wrapper;
  let component;

  it('renders the Home page without crashing if the user is authenticated', () => {
    const initialState = {
      auth: { isAuthenticated: true },
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-home');
    expect(component).toHaveLength(1);
  });

  it('renders a search bar', () => {
    const initialState = {
      auth: { isAuthenticated: true },
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-search-bar');
    expect(component).toHaveLength(1);
  });
});
