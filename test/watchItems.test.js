const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const request = supertest(app);
const User = require('../models/User');
const WatchItem = require('../models/WatchItem');

const testUser = {
  firstName: 'test',
  surname: 'user3',
  email: 'test_user3@example.com',
  password: 'pass123',
  password2: 'pass123',
};
process.env.TEST_ID = '';

describe('login', () => {
  process.env.NODE_ENV = 'test';
  let registerResponse;

  beforeEach(async (done) => {
    await User.deleteMany();
    await WatchItem.deleteMany();
    registerResponse = await request.post('/api/users/register').send(testUser);
    done();
  });

  afterAll(async () => {
    await User.deleteMany();
    await WatchItem.deleteMany();
    await mongoose.connection.close();
    process.env.NODE_ENV = 'dev';
  });

  describe('POST /api/watchitems', () => {
    it('should store and return a company symbol and user id', async (done) => {
      // console.log(registerResponse);

      // const loginResponse = await request.post('/api/auth').send(loginTestUser);

      // expect(loginResponse.status).toEqual(200);
      // expect(loginResponse.error).toEqual(false);
      // expect(loginResponse.request._data.email).toEqual(
      //   'test_user2@example.com'
      // );
      // expect(loginResponse.request._data.password).toEqual('pass123');
      done();
    });
  });
});
