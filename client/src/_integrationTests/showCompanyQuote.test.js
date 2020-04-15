import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
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

  axios.get.mockImplementation((url) => {
    switch (url) {
      case `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.REACT_APP_FINNHUB_API_KEY}`:
        return Promise.resolve({ data: mockAAPLQuote });
      default:
        return Promise.reject(new Error('Not Found'));
    }
  });

  // global.fetch = jest.fn(() => Promise.resolve({ json: () => mockAAPLQuote }));

  it('updates state and redirects to dashboard component', async () => {
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
