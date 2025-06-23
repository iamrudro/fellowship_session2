const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('MongoDB Connection', () => {
    it('should connect to in-memory MongoDB', async () => {
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        expect(mongoose.connection.readyState).toBe(1);
    });
});
