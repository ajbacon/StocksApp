const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const request = supertest(app);
const User = require('../models/User');

const testUser = {
  firstName: 'test',
  surname: 'user2',
  email: 'test_user2@example.com',
  password: 'pass123',
  password2: 'pass123',
};

const loginTestUser = {
  email: 'test_user2@example.com',
  password: 'pass123',
};

describe('login', () => {
  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe('POST /api/auth', () => {
    describe('with successful mongoose connection', () => {
      beforeEach(async (done) => {
        await User.deleteMany();
        await request.post('/api/users/register').send(testUser);
        done();
      });

      it('should return a response status of 200 when a valid user logs in', async (done) => {
        const loginResponse = await request
          .post('/api/auth')
          .send(loginTestUser);

        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.error).toEqual(false);
        expect(loginResponse.request._data.email).toEqual(
          'test_user2@example.com'
        );
        expect(loginResponse.request._data.password).toEqual('pass123');
        done();
      });

      it('should return a jwt token', async (done) => {
        const loginResponse = await request
          .post('/api/auth')
          .send(loginTestUser);

        expect(loginResponse.body.token).not.toBeNull();

        done();
      });

      it('should return an error if an email is not specified and return status of 400', async (done) => {
        const badLoginTestUser = {
          password: 'pass123',
        };

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

      it('should return an error if incorrect password and return status of 400', async (done) => {
        const badLoginTestUser = {
          email: 'test_user2@example.com',
          password: 'wrongPassword',
        };

        const loginResponse = await request
          .post('/api/auth')
          .send(badLoginTestUser);

        expect(loginResponse.status).toEqual(400);
        expect(loginResponse.error.text).toEqual(
          '{"msg":"invalid credentials"}'
        );
        expect(loginResponse.body.msg).toEqual('invalid credentials');
        done();
      });

      it('should return an error if email doesnt exist in database and return status of 400', async (done) => {
        const badLoginTestUser = {
          email: 'doesnt_exist@example.com',
          password: 'pass123',
        };

        const loginResponse = await request
          .post('/api/auth')
          .send(badLoginTestUser);

        expect(loginResponse.status).toEqual(400);
        expect(loginResponse.error.text).toEqual(
          '{"msg":"invalid credentials"}'
        );
        expect(loginResponse.body.msg).toEqual('invalid credentials');
        done();
      });

      it('should return an error if email is invalid and return status of 400', async (done) => {
        const badLoginTestUser = {
          email: 'invalid_email',
          password: 'pass123',
        };

        const loginResponse = await request
          .post('/api/auth')
          .send(badLoginTestUser);

        expect(loginResponse.status).toEqual(400);
        expect(loginResponse.error.text).toEqual(
          '{"email":"Email is invalid"}'
        );
        expect(loginResponse.body.email).toEqual('Email is invalid');
        done();
      });

      it('should return an error if password field is empty and return status of 400', async (done) => {
        const badLoginTestUser = {
          email: 'test_user2@example.com',
        };

        const loginResponse = await request
          .post('/api/auth')
          .send(badLoginTestUser);

        expect(loginResponse.status).toEqual(400);
        expect(loginResponse.error.text).toEqual(
          '{"password":"Password field is required"}'
        );
        expect(loginResponse.body.password).toEqual(
          'Password field is required'
        );
        done();
      });
    });
  });
});
