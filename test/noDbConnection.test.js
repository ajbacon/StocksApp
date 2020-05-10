const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

jest.mock('mongoose');

describe('When no mongoose connection', () => {
  let mockExit;
  let mockConsoleError;
  let mongooseConnectSpyOn;
  let app;
  let request;

  const loginTestUser = {
    email: 'test_user2@example.com',
    password: 'pass123',
  };

  beforeAll(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementation(() => {
        throw new Error('message');
      });
    app = require('../server');
    request = supertest(app);
  });

  describe('GET /api/auth', () => {
    it('should return a status code of 500', async () => {
      const payload = { test: 'test' };

      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 360000 });

      const authenticateRes = await request
        .get('/api/auth')
        .set('x-auth-token', token)
        .send();

      expect(authenticateRes.status).toBe(500);
    });
  });

  describe('POST /api/auth', () => {
    it('should return a status code of 500', async () => {
      const payload = { test: 'test' };

      const loginResponse = await request.post('/api/auth').send(loginTestUser);

      expect(loginResponse.status).toBe(500);
    });
  });
});
