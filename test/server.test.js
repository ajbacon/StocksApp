const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const request = supertest(app);
const User = require('../models/User');

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
    it('should return a response status of 200', async done => {
      const testUser = {
        firstName: 'test',
        surname: 'user',
        email: 'test_user@example.com',
        password: 'pass123',
        password2: 'pass123'
      };
      const response = await request.post('/api/users/register').send(testUser);

      expect(response.status).toEqual(200);
      done();
    });
  });
});
