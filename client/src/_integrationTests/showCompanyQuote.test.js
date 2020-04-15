import { mockAAPLQuote } from '../utils/mockTestData';
import { findByTestAttr, integrationSetup } from '../utils/testUtils';
import App from '../App';

const existingUser = {
  firstName: 'Eric',
  surname: 'Cantona',
  email: 'e_cantona@example.com',
  password: 'pass123',
};

describe('select company and show quote data', () => {
  let component;

  // global.fetch = jest.fn(() => Promise.resolve({ json: () => mockAAPLQuote }));

  it('updates state and redirects to dashboard component', async () => {
    const intitalState = {
      alert: [],
      auth: {
        token: 'jwtheader.payload.signature',
        isAuthenticated: true,
        loading: false,
        user: {
          _id: '1',
          firstName: 'Eric',
          surname: 'Cantona',
          email: 'e_cantona@example.com',
          Date: 'date',
        },
      },
    };
    const { wrapper, store } = integrationSetup(App, intitalState);
    component = findByTestAttr(wrapper, 'component-search-input');
    component.simulate('focus');
    component.simulate('change', {
      target: { value: 'AAPL' },
    });
    wrapper.update();
    const selection = wrapper.find('#item0');
    await selection.simulate('click');
    wrapper.update();
    console.log(wrapper.debug());
    console.log(process.env.REACT_APP_FINNHUB_API_KEY);
  });
});
