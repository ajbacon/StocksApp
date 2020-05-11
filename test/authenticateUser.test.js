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

describe('Authenticate User', () => {
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
        const authenticateRes = await request
          .get('/api/auth')
          .set('x-auth-token', registerResponse.body.token)
          .send();

        expect(authenticateRes.status).toBe(200);
        expect(authenticateRes.body.firstName).toBe('test');
        expect(authenticateRes.body.surname).toBe('user2');
        expect(authenticateRes.body.email).toBe('test_user2@example.com');
      });

      it('should deny authentication if no x-auth-token provided in the header', async () => {
        const authenticateRes = await request.get('/api/auth').send();

        expect(authenticateRes.status).toBe(401);
        expect(authenticateRes.body.msg).toBe('No token, authorisation denied');
      });

      it('should deny authentication if x-auth-token is an invalid jwt', async () => {
        const authenticateRes = await request
          .get('/api/auth')
          .set('x-auth-token', 'invalidToken')
          .send();

        expect(authenticateRes.status).toBe(401);
        expect(authenticateRes.body.msg).toBe('Token in not valid');
      });
    });
  });
});
