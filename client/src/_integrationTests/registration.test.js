import axios from 'axios';

import { findByTestAttr, integrationSetup } from '../utils/testUtils';
import App from '../App';

const newUser = {
  firstName: 'Eric',
  surname: 'Cantona',
  email: 'e_cantona@example.com',
  password: 'pass123',
  password2: 'pass123',
};

jest.mock('axios');

describe('<App />', () => {
  let component;
  let wrapper;

  describe('successful registration', () => {
    const resToken = { token: 'jwtheader.payload.signature' };
    const resUser = {
      _id: '1',
      firstName: newUser.firstName,
      surname: newUser.surname,
      email: newUser.email,
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
        case '/api/users/register':
          return Promise.resolve({ data: resToken });
        default:
          return Promise.reject(new Error('Not Found'));
      }
    });

    it('updates state and redirects to dashboard component', async () => {
      const { wrapper, store } = integrationSetup(App);
      component = findByTestAttr(wrapper, 'component-register-btn');
      component.at(0).simulate('click', { button: 0 });

      const firstNameField = findByTestAttr(wrapper, 'component-first-name');
      const surnameField = findByTestAttr(wrapper, 'component-surname');
      const emailField = findByTestAttr(wrapper, 'component-email');
      const passwordField = findByTestAttr(wrapper, 'component-password');
      const confirmPasswordField = findByTestAttr(
        wrapper,
        'component-password2'
      );
      const submitButton = findByTestAttr(wrapper, 'component-signup-btn');

      firstNameField.simulate('change', {
        target: { value: newUser.firstName, id: 'firstName' },
      });
      surnameField.simulate('change', {
        target: { value: newUser.surname, id: 'surname' },
      });
      emailField.simulate('change', {
        target: { value: newUser.email, id: 'email' },
      });
      passwordField.simulate('change', {
        target: { value: newUser.password, id: 'password' },
      });
      confirmPasswordField.simulate('change', {
        target: { value: newUser.password2, id: 'password2' },
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
