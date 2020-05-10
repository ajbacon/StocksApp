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

  const testUser = {
    firstName: 'test',
    surname: 'user',
    email: 'test_user@example.com',
    password: 'pass123',
    password2: 'pass123',
  };

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

      const response = await request
        .get('/api/auth')
        .set('x-auth-token', token)
        .send();

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/auth', () => {
    it('should return a status code of 500', async () => {
      const response = await request.post('/api/auth').send(loginTestUser);

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/users/register', () => {
    it('should return a status code of 500', async () => {
      const response = await request.post('/api/users/register').send(testUser);

      expect(response.status).toBe(500);
    });
  });
});
