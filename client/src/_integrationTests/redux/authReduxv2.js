import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { register, loadUser } from '../../actions/auth';

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
    it('fires the loadUser action creator', (done) => {
      const initialState = {
        alert: [],
        auth: { token: null, isAuthenticated: null, loading: true, user: null },
      };
      const store = mockStore(initialState);

      moxios.wait(() => {
        const request1 = moxios.requests.at(0);
        request1.respondWith({
          status: 200,
          response: { token: 'jwtheader.payload.signature' },
        });
        done();
        // moxios.wait(() => {
        //   const request2 = moxios.requests.at(1);
        //   request2.respondWith({
        //     status: 200,
        //     response: { something: 'jwtheader.payload.signature' },
        //   });
        //   done();
        // });
      });

      // console.log(moxios.requests);

      // moxios.stubRequest('/api/users/register', {
      //   status: 200,
      //   response: { token: 'jwtheader.payload.signature' },
      // });

      // moxios.stubRequest('/api/auth', {
      //   status: 200,
      //   response: { something: 'something' },
      // });

      return store.dispatch(register(newUser)).then(() => {
        console.log(store.getActions());
      });
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
