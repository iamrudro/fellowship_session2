const request = require('supertest');
const app = require('../../server');

describe('GET /:id', () => {
    it('should return 404 for invalid id', async () => {
        const res = await request(app).get('/123');
        expect(res.status).toBe(500);
    });
});
