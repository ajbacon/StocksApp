import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import Alert from './Alert';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Alert store={store} />)
    .dive()
    .dive();
  console.log(wrapper.debug());
  return wrapper;
};

describe('<Alert />', () => {
  let wrapper;
  let component;

  it('renders an alert message without crashing', () => {
    const initialState = {
      alert: [{ id: 1, msg: 'Alert msg 1' }],
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-alert');
    expect(component).toHaveLength(1);
  });

  it('renders 2 alert messages if they exist', () => {
    const initialState = {
      alert: [
        { id: 1, msg: 'Alert msg 1' },
        { id: 2, msg: 'Alert msg 2' },
      ],
    };
    wrapper = setup(initialState);
    component = findByTestAttr(wrapper, 'component-alert');
    expect(component).toHaveLength(2);
  });

  // it('renders login inputs and submit button', () => {
  //   wrapper = setup();
  //   const componentEmail = findByTestAttr(wrapper, 'component-email-input');
  //   const componentPassword = findByTestAttr(
  //     wrapper,
  //     'component-password-input'
  //   );
  //   const componentSubmitBtn = findByTestAttr(wrapper, 'component-submit-btn');
  //   expect(componentEmail).toHaveLength(1);
  //   expect(componentPassword).toHaveLength(1);
  //   expect(componentSubmitBtn).toHaveLength(1);
  // });
});
