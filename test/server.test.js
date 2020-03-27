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

describe('server', () => {
  beforeEach(async done => {
    await User.deleteMany();
    done();
  });

  afterAll(async done => {
    mongoose.connection.close();
    done();
  });

  describe('POST /api/users/register', () => {
    it('should pass the correct data in the request and return a response status of 200', async done => {
      const response = await request.post('/api/users/register').send(testUser);

      expect(response.status).toEqual(200);
      expect(response.error).toEqual(false);
      expect(response.request._data.firstName).toEqual('test');
      expect(response.request._data.surname).toEqual('user');
      expect(response.request._data.email).toEqual('test_user@example.com');
      expect(response.request._data.password).toEqual('pass123');
      expect(response.request._data.password2).toEqual('pass123');
      done();
    });

    it('should return a jwt token and add user to the database', async done => {
      const response = await request.post('/api/users/register').send(testUser);

      const bodyKeys = Object.keys(response.body);
      expect(bodyKeys).toHaveLength(1);
      expect(bodyKeys[0]).toEqual('token');
      expect(response.body.token).not.toBeNull();

      const users = await User.find();
      expect(users).toHaveLength(1);
      expect(users[0].email).toEqual('test_user@example.com');
      done();
    });

    it('should return an error if an email is not specified and return status of 400', async done => {
      const testUser = {
        firstName: 'test',
        surname: 'user',
        password: 'pass123',
        password2: 'pass123'
      };
      const response = await request.post('/api/users/register').send(testUser);

      expect(response.status).toEqual(400);
      expect(response.error.text).toEqual(
        '{"email":"Email field is required"}'
      );
      expect(response.body.email).toEqual('Email field is required');
      done();
    });
  });
});
