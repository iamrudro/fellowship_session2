const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Subscriber = require('../../models/subscriberModel');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Subscriber.deleteMany({});
});

describe('POST /', () => {
    it('should create a new subscriber with valid data', async () => {
        const res = await request(app).post('/').send({
            name: 'Rudro',
            subedToChannel: 'Node.js'
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');
    });

    it('should return 400 for invalid subscriber data', async () => {
        const res = await request(app).post('/').send({
            name: '',
        });

        expect(res.status).toBe(400);
    });
});
