import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory, findByTestAttr } from '../../utils/testUtils';
import CompanyData from './CompanyData';

const setup = (state = {}) => {
  const wrapper = shallow(<CompanyData />);
  return wrapper;
};

describe('<CompanyData />', () => {
  let wrapper;
  let component;

  it('renders without crashing', () => {
    wrapper = setup();
    component = findByTestAttr(wrapper, 'component-company-data');
    expect(component).toHaveLength(1);
  });
});
