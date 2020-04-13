import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import Landing from './Landing';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Landing store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('<Landing />', () => {
  let wrapper;
  let component;

  it('renders the landing page without crashing', () => {
    const initialState = {
      auth: { isAuthenticated: false },
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-landing');
    expect(component).toHaveLength(1);
  });

  it('does not render if the user is currently authenticated', () => {
    const initialState = {
      auth: { isAuthenticated: true },
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-landing');
    expect(component).toHaveLength(0);
  });

  it('renders a register button', () => {
    const initialState = {
      auth: { isAuthenticated: false },
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-register-btn');
    expect(component).toHaveLength(1);
  });

  it('renders a login button', () => {
    const initialState = {
      auth: { isAuthenticated: false },
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-login-btn');
    expect(component).toHaveLength(1);
  });
});
