const request = require('supertest');
const app = require('./app');

describe('Express App Configuration', () => {
  test('should respond with 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });

  test('should have CORS middleware enabled', async () => {
    const response = await request(app).get('/');
    expect(response.header['access-control-allow-origin']).toBe('*');
  });
});
