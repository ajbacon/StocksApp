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

  beforeAll(async done => {
    await User.collection.drop();
    done();
  });

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

    it('should return a jwt token', async done => {
      const registerResponse = await request
        .post('/api/users/register')
        .send(testUser);

      const loginResponse = await request.post('/api/auth').send(loginTestUser);

      const bodyKeys = Object.keys(loginResponse.body);
      expect(bodyKeys).toHaveLength(1);
      expect(bodyKeys[0]).toEqual('token');
      expect(loginResponse.body.token).not.toBeNull();

      done();
    });

    it('should return an error if an email is not specified and return status of 400', async done => {
      const badLoginTestUser = {
        password: 'pass123'
      };
      const registerResponse = await request
        .post('/api/users/register')
        .send(testUser);

      const loginResponse = await request
        .post('/api/auth')
        .send(badLoginTestUser);

      expect(loginResponse.status).toEqual(400);
      expect(loginResponse.error.text).toEqual(
        '{"email":"Email field is required"}'
      );
      expect(loginResponse.body.email).toEqual('Email field is required');
      done();
    });

    // it('should return an error if incorrect password and return status of 400', async done => {
    //   const badLoginTestUser = {
    //     email: 'test_user@example.com',
    //     password: 'wrongPassword'
    //   };
    //   const registerResponse = await request
    //     .post('/api/users/register')
    //     .send(testUser);

    //   const loginResponse = await request
    //     .post('/api/auth')
    //     .send(badLoginTestUser);

    //   expect(loginResponse.status).toEqual(400);
    //   expect(loginResponse.error.text).toEqual('{"msg":"invalid credentials"}');
    //   expect(loginResponse.body.msg).toEqual('invalid credentials');
    //   done();
    // });

    // it('should return an error if an incorrect password is specified and return status of 400', async done => {
    //   const badLoginTestUser = {
    //     password: 'pass123'
    //   };
    //   const registerResponse = await request
    //     .post('/api/users/register')
    //     .send(testUser);

    //   const loginResponse = await request
    //     .post('/api/auth')
    //     .send(badLoginTestUser);

    //   expect(loginResponse.status).toEqual(400);
    //   expect(loginResponse.error.text).toEqual(
    //     '{"email":"Email field is required"}'
    //   );
    //   expect(loginResponse.body.email).toEqual('Email field is required');
    //   done();
    // });
  });
});
