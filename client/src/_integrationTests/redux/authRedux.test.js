import moxios from 'moxios';
import thunk from 'redux-thunk';

import { storeFactory } from '../../utils/testUtils';
import { login, register, loadUser, logout } from '../../actions/auth';

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
      // the first to /api/users/register
      // the second to /api/auth after dispatch(loadUser())
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

  describe('unsuccessful login', () => {
    it('does something', async () => {
      const store = storeFactory();
      moxios.stubRequest('/api/auth', {
        status: 400,
        response: {
          alert1: 'error message 1',
          alert2: 'error message 2',
        },
      });

      const result = await store.dispatch(login(existingUser));
      const newState = store.getState();
      expect(newState.alert.length).toBe(2);
      expect(newState.alert[0].msg).toBe('error message 1');
      expect(newState.alert[1].msg).toBe('error message 2');

      expect(newState.auth.token).toBe(null);
      expect(newState.auth.isAuthenticated).toBe(false);
      expect(newState.auth.loading).toBe(false);
    });
  });
});

describe('load user auth action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('successful transaction', () => {
    it('updates user details', async () => {
      const store = storeFactory();

      moxios.stubRequest('/api/auth', {
        status: 200,
        response: { user: 'details' },
      });

      const result = await store.dispatch(loadUser());
      const newState = store.getState();
      expect(newState.auth.user).toEqual({ user: 'details' });
      // check that the store.dispatch generates 1 moxios request
      expect(moxios.requests.__items[0].config.url).toBe('/api/auth');
    });
  });

  describe('unsuccessful transaction', () => {
    it('does something', async () => {
      const initialState = {
        alert: [],
        auth: {
          token: 'jwtheader.payload.signature',
          isAuthenticated: true,
          loading: false,
          user: { user: 'details' },
        },
      };
      const store = storeFactory(initialState);
      moxios.stubRequest('/api/auth', {
        status: 400,
        response: {},
      });

      const result = await store.dispatch(loadUser());
      const newState = store.getState();

      expect(newState.auth.token).toBe(null);
      expect(newState.auth.isAuthenticated).toBe(false);
      expect(newState.auth.loading).toBe(false);
      expect(newState.auth.user).toBe(null);
    });
  });
});

describe('logout auth action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const initialState = {
    alert: [],
    auth: {
      token: 'jwtheader.payload.signature',
      isAuthenticated: true,
      loading: false,
      user: { user: 'details' },
    },
  };

  it('updates user details', () => {
    const store = storeFactory();

    const result = store.dispatch(logout());
    const newState = store.getState();

    expect(newState.auth.token).toBe(null);
    expect(newState.auth.isAuthenticated).toBe(false);
    expect(newState.auth.loading).toBe(false);
    expect(newState.auth.user).toBe(null);
  });
});
