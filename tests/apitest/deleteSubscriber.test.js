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

describe('DELETE /:id', () => {
    it('should delete an existing subscriber', async () => {
        const sub = await Subscriber.create({
            name: 'To Delete',
            subedToChannel: 'Test'
        });

        const res = await request(app).delete(`/${sub._id}`);
        expect(res.status).toBe(200);

        const check = await Subscriber.findById(sub._id);
        expect(check).toBeNull();
    });

    it('should return 404 for invalid id', async () => {
        const res = await request(app).delete('/123');
        expect(res.status).toBe(500);
    });
});
