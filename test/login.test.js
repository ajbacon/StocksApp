const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const request = supertest(app);
const User = require('../models/User');

const testUser = {
  firstName: 'test',
  surname: 'user',
  email: 'test_user@example.com',
  password: 'pass123',
  password2: 'pass123'
};

const loginTestUser = {
  email: 'test_user@example.com',
  password: 'pass123'
};

describe('login', () => {
  process.env.NODE_ENV = 'test';
  beforeEach(async done => {
    await User.deleteMany();
    done();
  });

  afterAll(async done => {
    await User.deleteMany();
    await mongoose.connection.close();
    process.env.NODE_ENV = 'dev';
    done();
  });

  describe('POST /api/auth', () => {
    it('should return a response status of 200 when a valid user logs in', async done => {
      const registerResponse = await request
        .post('/api/users/register')
        .send(testUser);

      const loginResponse = await request.post('/api/auth').send(loginTestUser);

      expect(loginResponse.status).toEqual(200);
      expect(loginResponse.error).toEqual(false);
      expect(loginResponse.request._data.email).toEqual(
        'test_user@example.com'
      );
      expect(loginResponse.request._data.password).toEqual('pass123');
      done();
    });
  });
});
