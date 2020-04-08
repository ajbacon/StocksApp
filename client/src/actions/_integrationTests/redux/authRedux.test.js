// This file uses two separate ways to create a store for testing
//
// The first method creates an instance of the actual store, this has the
// benefit of showing that the actions and reducers interact correctly with
// real store. This approach is endorsed by enzyme
//
// The second approach uses a mock store from the appropriately named
// 'redux-mock-store'. This mock store has the added benefit of documenting
// all actions that were fired in the tested action.
//
// Both methods have their benefits and are intentionally left in
// to document both methods for future reference

import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { storeFactory } from '../../../utils/testUtils';
import { register } from '../../../actions/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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
      moxios.wait(() => {});

      const result = await store.dispatch(register(newUser));
      console.log(store);
      const newState = store.getState();
      expect(newState.auth.token).toBe('jwtheader.payload.signature');
      expect(newState.auth.isAuthenticated).toBe(true);
      expect(newState.auth.loading).toBe(false);
    });

    // it('fires the loadUser action creator', async () => {
    //   const initialState = {
    //     alert: [],
    //     auth: { token: null, isAuthenticated: null, loading: true, user: null },
    //   };
    //   const store = mockStore(initialState);
    //   // moxios.stubRequest('/api/users/register', {
    //   //   status: 200,
    //   //   response: { token: 'jwtheader.payload.signature' },
    //   // });
    //   // moxios.stubRequest('/api/auth', {
    //   //   status: 200,
    //   //   response: { something: 'something' },
    //   // });
    //   moxios.wait(() => {
    //     const request = moxios.requests.mostRecent();
    //     request.respondWith({
    //       status: 200,
    //       response: { token: 'jwtheader.payload.signature' },
    //     });
    //   });
    //   const result = await store.dispatch(register(newUser));

    //   console.log(store.getState());

    //   // const loadUser = jest.fn();
    //   // await register(newUser)(loadUser);
    //   // console.log(loadUser.mock.calls);
    // });
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
