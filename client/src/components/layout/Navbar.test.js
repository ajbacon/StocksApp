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

  it('renders login and register links when user is not authorised', () => {
    const initialState = {
      auth: { isAuthenticated: false },
    };
    wrapper = setup(initialState);
    const loginLink = findByTestAttr(wrapper, 'component-login-link');
    const registerLink = findByTestAttr(wrapper, 'component-register-link');
    // 2 links because of the hidden mobile view links
    expect(loginLink).toHaveLength(2);
    expect(registerLink).toHaveLength(2);
  });

  it('renders the logout link when user is authorised', () => {
    const initialState = {
      auth: { isAuthenticated: true },
    };
    wrapper = setup(initialState);
    const logoutLink = findByTestAttr(wrapper, 'component-logout-link');
    // 2 links because of the hidden mobile view links
    expect(logoutLink).toHaveLength(2);
  });
});
