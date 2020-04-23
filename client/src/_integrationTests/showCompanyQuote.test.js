import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { mockAAPLQuote } from '../utils/mockTestData';
import {
  findByTestAttr,
  integrationSetup,
  storeFactory,
} from '../utils/testUtils';
import App from '../App';

const existingUser = {
  firstName: 'Eric',
  surname: 'Cantona',
  email: 'e_cantona@example.com',
  password: 'pass123',
};

jest.mock('axios');

describe('select company and show quote data', () => {
  let component;

  it('updates state and redirects to dashboard component', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: mockAAPLQuote })
    );
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
