import { describe, it } from 'vitest';
import request from 'supertest';
import app from '../../app.js';

describe('GET /healthcheck', () => {
  it('should return 200 response with version data', async () => {
    const response = await request(app).get('/healthcheck').expect(200);
    expect(response.body).toHaveProperty('version');
  });

  it('should return JSON format', async () => {
    const response = await request(app).get('/healthcheck').set('Accept', 'application/json').expect('Content-Type', /json/);
  });

  it('should return 404 for invalid endpoint', async () => {
    await request(app).get('/invalidendpoint').expect(404);
  });

  it('should return 500 for server error', async () => {
    app.get('/healthcheck', () => {
      throw new Error('Server error');
    });

    await request(app).get('/healthcheck').expect(500);
  });
});
