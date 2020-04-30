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
  let authResponse;

  beforeEach(async (done) => {
    await User.deleteMany();
    await WatchItem.deleteMany();
    registerResponse = await request.post('/api/users/register').send(testUser);
    authResponse = await request
      .get('/api/auth')
      .set('x-auth-token', registerResponse.body.token)
      .send();
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
      const payload = { symbol: 'AAPL', description: 'APPLE INC' };

      const watchItemRes = await request
        .post('/api/watchitems')
        .set('x-auth-token', registerResponse.body.token)
        .send(payload);

      const items = await WatchItem.find({ userId: authResponse.body._id });

      expect(watchItemRes.status).toEqual(200);
      expect(watchItemRes.error).toEqual(false);
      expect(watchItemRes.body.symbol).toEqual('AAPL');
      expect(watchItemRes.body.userId).toEqual(authResponse.body._id);
      expect(items.length).toEqual(1);
      done();
    });

    it('should not store a company symbol if already watched by the user', async (done) => {
      // console.log(registerResponse);
      const payload = { symbol: 'AAPL', description: 'APPLE INC' };

      const watchItemRes = await request
        .post('/api/watchitems')
        .set('x-auth-token', registerResponse.body.token)
        .send(payload);

      const watchItemRes2 = await request
        .post('/api/watchitems')
        .set('x-auth-token', registerResponse.body.token)
        .send(payload);

      const items = await WatchItem.find({ userId: authResponse.body._id });

      expect(watchItemRes2.status).toEqual(400);
      expect(watchItemRes2.error.text).toEqual(
        '{"watchItem":"Company already on user watch list"}'
      );
      expect(items.length).toEqual(1);
      done();
    });
  });
});
