import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import Register from './Register';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Register store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('<Register />', () => {
  let wrapper;
  let component;

  it('renders without crashing', () => {
    wrapper = setup();
    component = findByTestAttr(wrapper, 'component-register');
    expect(component).toHaveLength(1);
  });

  it('renders registration inputs and sign up button', () => {
    wrapper = setup();
    const componentFirstName = findByTestAttr(wrapper, 'component-first-name');
    const componentSurname = findByTestAttr(wrapper, 'component-surname');
    const componentEmail = findByTestAttr(wrapper, 'component-email');
    const componentPassword = findByTestAttr(wrapper, 'component-password');
    const componentPassword2 = findByTestAttr(wrapper, 'component-password2');
    const componentSignupBtn = findByTestAttr(wrapper, 'component-signup-btn');
    expect(componentFirstName).toHaveLength(1);
    expect(componentSurname).toHaveLength(1);
    expect(componentEmail).toHaveLength(1);
    expect(componentPassword).toHaveLength(1);
    expect(componentPassword2).toHaveLength(1);
    expect(componentSignupBtn).toHaveLength(1);
  });
});
