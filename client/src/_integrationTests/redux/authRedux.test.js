import moxios from 'moxios';
import thunk from 'redux-thunk';

import { storeFactory } from '../../utils/testUtils';
import { login, register, loadUser } from '../../actions/auth';

const newUser = {
  firstName: 'Eric',
  surname: 'Cantona',
  email: 'e_cantona@example.com',
  password: 'pass123',
  password2: 'pass123',
};

const existingUser = {
  email: 'e_cantona@example.com',
  password: 'pass123',
};

describe('register auth action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('successful registration', () => {
    it('changes token, isAuthenticated and loading to authenticated state', async () => {
      const store = storeFactory();

      moxios.stubRequest('/api/users/register', {
        status: 200,
        response: { token: 'jwtheader.payload.signature' },
      });
      moxios.stubRequest('/api/auth', {
        status: 200,
        response: { user: 'details' },
      });

      const result = await store.dispatch(register(newUser));
      const newState = store.getState();
      expect(newState.auth.token).toBe('jwtheader.payload.signature');
      expect(newState.auth.isAuthenticated).toBe(true);
      expect(newState.auth.loading).toBe(false);
      // check that the store.dispatch generates 2 moxios requests
      // the first for the /api/users/register
      // the second for /api/auth after dispatch(loadUser()) is called
      expect(moxios.requests.__items[0].config.url).toBe('/api/users/register');
      expect(moxios.requests.__items[1].config.url).toBe('/api/auth');
    });
  });

  describe('unsuccessful registration', () => {
    it('does something', async () => {
      const store = storeFactory();
      moxios.stubRequest('/api/users/register', {
        status: 400,
        response: {
          alert1: 'error message 1',
          alert2: 'error message 2',
        },
      });

      const result = await store.dispatch(register(newUser));
      const newState = store.getState();
      expect(newState.alert.length).toBe(2);
      expect(newState.alert[0].msg).toBe('error message 1');
      expect(newState.alert[1].msg).toBe('error message 2');

      expect(newState.auth.token).toBe(null);
      expect(newState.auth.isAuthenticated).toBe(false);
      expect(newState.auth.loading).toBe(false);

      console.log(newState);
    });
  });
});

describe('login auth action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('successful login', () => {
    it('changes token, isAuthenticated and loading to authenticated state', async () => {
      const store = storeFactory();

      moxios.stubRequest('/api/auth', {
        status: 200,
        response: { token: 'jwtheader.payload.signature' },
      });
      moxios.stubRequest('/api/auth', {
        status: 200,
        response: { user: 'details' },
      });

      const result = await store.dispatch(login(existingUser));
      const newState = store.getState();
      console.log(newState);
      expect(newState.auth.token).toBe('jwtheader.payload.signature');
      expect(newState.auth.isAuthenticated).toBe(true);
      expect(newState.auth.loading).toBe(false);
      // check that the store.dispatch generates 2 moxios requests
      // the first for the /api/users/register
      // the second for /api/auth after dispatch(loadUser()) is called
      expect(moxios.requests.__items[0].config.url).toBe('/api/auth');
      expect(moxios.requests.__items[1].config.url).toBe('/api/auth');
    });
  });
});
