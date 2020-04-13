import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import Login from './Login';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Login store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('<Login />', () => {
  let wrapper;
  let component;

  it('renders without crashing', () => {
    wrapper = setup();
    component = findByTestAttr(wrapper, 'component-login');
    expect(component).toHaveLength(1);
  });

  it('renders login inputs and submit button', () => {
    wrapper = setup();
    const componentEmail = findByTestAttr(wrapper, 'component-email-input');
    const componentPassword = findByTestAttr(
      wrapper,
      'component-password-input'
    );
    const componentSubmitBtn = findByTestAttr(wrapper, 'component-submit-btn');
    expect(componentEmail).toHaveLength(1);
    expect(componentPassword).toHaveLength(1);
    expect(componentSubmitBtn).toHaveLength(1);
  });
});
