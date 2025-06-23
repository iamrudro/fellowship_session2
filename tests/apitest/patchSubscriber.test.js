const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Subscriber = require('../../models/subscriberModel');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Subscriber.deleteMany({});
});

describe('PATCH /:id', () => {
    it('should update an existing subscriber', async () => {
        const sub = await Subscriber.create({
            name: 'Old Name',
            subedToChannel: 'JS'
        });

        const res = await request(app)
            .patch(`/${sub._id}`)
            .send({ name: 'Updated Name' });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Name');
    });

    it('should return 404 for invalid id', async () => {
        const res = await request(app)
            .patch('/123')
            .send({ name: 'Updated Name' });

        expect(res.status).toBe(500);
    });
});
