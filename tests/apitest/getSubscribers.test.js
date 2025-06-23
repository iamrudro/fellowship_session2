const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Subscriber = require('../../models/subscriberModel');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Clear collection before each test
    await Subscriber.deleteMany({});
});

describe('GET /', () => {
    it('should return status 200 and a list of subscribers', async () => {
        const dummySubs = [
            { name: 'Alice', subedToChannel: 'Node' },
            { name: 'Bob', subedToChannel: 'React' },
        ];

        await Subscriber.insertMany(dummySubs);

        const res = await request(app).get('/');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty('name', 'Alice');
    });
});
