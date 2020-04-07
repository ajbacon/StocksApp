import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { setup, findByTestAttr } from './test-helpers';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<App />', () => {
  let wrapper;
  let component;

  it('renders without crashing', () => {
    wrapper = setup(App);
    component = findByTestAttr(wrapper, 'component-app');
    expect(component).toHaveLength(1);
  });
});
