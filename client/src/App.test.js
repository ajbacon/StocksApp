import { setup, findByTestAttr } from './utils/testUtils';

import App from './App';

describe('<App />', () => {
  let wrapper;
  let component;

  it('renders without crashing', () => {
    wrapper = setup(App);
    component = findByTestAttr(wrapper, 'component-app');
    expect(component).toHaveLength(1);
  });
});
