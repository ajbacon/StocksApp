import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    const component = wrapper.find('[data-test="component-app1"]');
    expect(component).toHaveLength(1);
  });
});
