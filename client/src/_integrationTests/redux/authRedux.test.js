import moxios from 'moxios';
import thunk from 'redux-thunk';

import { storeFactory } from '../../utils/testUtils';
import { register, loadUser } from '../../actions/auth';

const newUser = {
  firstName: 'Eric',
  surname: 'Cantona',
  email: 'e_cantona@example.com',
  password: 'pass123',
  password2: 'pass123',
};

describe('register auth action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('successful authentication', () => {
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
});
