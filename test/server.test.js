const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

describe('server', () => {
  describe('GET /', () => {
    xit('should return a response status of 200', async () => {
      const response = await request.get('/');

      expect(response.status).toEqual(200);
    });
  });
});
