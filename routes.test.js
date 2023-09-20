const request = require('supertest');
const express = require('express');
const app = express();
const router = require('./routes'); // Replace with the actual path to your router file

app.use('/', router);

describe('GET /spoonacular', () => {
  test('should return recipes when seasonings are provided', async () => {
    // Define a sample request with seasonings
    const response = await request(app)
      .get('/spoonacular')
      .query({ seasonings: 'salt,pepper' });

    // Assuming you expect a 200 status code and JSON response
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined(); // You can make more specific assertions here
  });

  test('should return a 400 error when seasonings parameter is missing', async () => {
    // Define a request without seasonings
    const response = await request(app).get('/spoonacular');

    // Expect a 400 status code and the specific error message
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Seasonings parameter is required.' });
  });
});
