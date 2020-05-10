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
  let registerResponse;
  beforeAll(async (done) => {
    registerResponse = await request.post('/api/users/register').send(testUser);
    done();
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe('GET /api/auth', () => {
    describe('with successful mongoose connection', () => {
      it('should return the authenticated user', async () => {
        // const registerResponse = await request
        //   .post('/api/users/register')
        //   .send(testUser);

        const authenticateRes = await request
          .get('/api/auth')
          .set('x-auth-token', registerResponse.body.token)
          .send();

        expect(authenticateRes.status).toBe(200);
        expect(authenticateRes.body.firstName).toBe('test');
        expect(authenticateRes.body.surname).toBe('user2');
        expect(authenticateRes.body.email).toBe('test_user2@example.com');
      });
    });
  });
});
