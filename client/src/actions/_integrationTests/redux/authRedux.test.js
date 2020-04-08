import moxios from 'moxios';

import { storeFactory } from '../../../utils/testUtils';
import { register } from '../../../actions/auth';

describe('register auth action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('adds jwt response to state', async () => {
    const newUser = {
      firstName: 'Eric',
      surname: 'Cantona',
      email: 'e_cantona@example.com',
      password: 'pass123',
      password2: 'pass123',
    };

    const store = storeFactory();

    moxios.stubRequest('/api/users/register', {
      status: 200,
      response: { token: 'jwtheader.payload.signature' },
    });
    moxios.wait(() => {});

    const result = await store.dispatch(register(newUser));
    const newState = store.getState();
    expect(newState.auth.token).toBe('jwtheader.payload.signature');
    expect(newState.auth.isAuthenticated).toBe(true);
    expect(newState.auth.loading).toBe(false);
  });
});

// moxios.stubRequest('/api/auth', {
//   status: 200,
//   response: {
//     _id: 'abc123',
//     firstName: 'Eric',
//     surname: 'Cantona',
//     email: 'e_cantona@example.com',
//     password: 'pass123',
//   },
// });
// moxios.wait(() => {});
