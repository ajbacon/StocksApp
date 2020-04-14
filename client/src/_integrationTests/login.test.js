import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { findByTestAttr, storeFactory } from '../utils/testUtils';
import App from '../App';

const existingUser = {
  firstName: 'Eric',
  surname: 'Cantona',
  email: 'e_cantona@example.com',
  password: 'pass123',
};

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  return { wrapper, store };
};

jest.mock('axios');

describe('<App />', () => {
  let component;

  describe('successful registration', () => {
    const resToken = { token: 'jwtheader.payload.signature' };
    const resUser = {
      _id: '1',
      firstName: existingUser.firstName,
      surname: existingUser.surname,
      email: existingUser.email,
      Date: 'date',
    };

    axios.get.mockImplementation((url) => {
      switch (url) {
        case '/api/auth':
          return Promise.resolve({ data: resUser });
        default:
          return Promise.reject(new Error('Not Found'));
      }
    });

    axios.post.mockImplementation((url) => {
      switch (url) {
        case '/api/auth':
          return Promise.resolve({ data: resToken });
        default:
          return Promise.reject(new Error('Not Found'));
      }
    });

    it('updates state and redirects to dashboard component', async () => {
      const { wrapper, store } = setup();
      component = findByTestAttr(wrapper, 'component-login-btn');
      component.at(0).simulate('click', { button: 0 });

      const emailField = findByTestAttr(wrapper, 'component-email-input');
      const passwordField = findByTestAttr(wrapper, 'component-password-input');
      const submitButton = findByTestAttr(wrapper, 'component-submit-btn');

      emailField.simulate('change', {
        target: { value: existingUser.email, id: 'email' },
      });
      passwordField.simulate('change', {
        target: { value: existingUser.password, id: 'password' },
      });

      await await submitButton.simulate('submit');

      expect(store.getState().auth.token).toBe(resToken.token);
      expect(store.getState().auth.isAuthenticated).toBe(true);
      expect(store.getState().auth.loading).toBe(false);
      expect(store.getState().auth.user).toBe(resUser);
      expect(window.location.href).toBe('http://localhost/dashboard');
    });
  });
});
