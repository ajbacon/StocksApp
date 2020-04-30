import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { mockAAPLQuote } from '../utils/mockTestData';
import { findByTestAttr, integrationSetup } from '../utils/testUtils';
import App from '../App';

const existingUser = {
  firstName: 'Eric',
  surname: 'Cantona',
  email: 'e_cantona@example.com',
  password: 'pass123',
};

jest.mock('axios');

describe('select company and show quote data', () => {
  const alphaVantageUrl =
    'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=';
  let component;

  it('updates state and redirects to dashboard component', async () => {
    axios.get.mockImplementation((url) => {
      let mockUrl;
      if (url.includes(alphaVantageUrl)) {
        mockUrl = alphaVantageUrl;
      } else {
        mockUrl = url;
      }

      switch (mockUrl) {
        case alphaVantageUrl:
          return Promise.resolve({ data: mockAAPLQuote });
        case '/api/watchitems':
          return Promise.resolve({ data: [] });
        default:
      }
    });
    const initialState = {
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
      iexAPI: {
        searchQuoteData: null,
      },
      watchList: {
        watchListData: [],
      },
    };
    const { wrapper, store } = integrationSetup(App, initialState);
    component = findByTestAttr(wrapper, 'component-search-input');
    component.simulate('focus');
    component.simulate('change', {
      target: { value: 'AAPL' },
    });
    wrapper.update();
    const selection = wrapper.find('#item0');
    selection.simulate('click');

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    const renderedComponent = findByTestAttr(wrapper, 'component-company-data');
    expect(renderedComponent.length).toBe(1);
  });
});
