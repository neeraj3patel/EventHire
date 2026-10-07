import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let app;
let mongod;

const future = (days = 7) => new Date(Date.now() + days * 864e5).toISOString();

const basics = {
  eventName: 'Annual Gala Night',
  eventType: 'corporate',
  dateType: 'single',
  startDate: future(),
  location: 'Gurugram',
};

const planner = {
  ...basics,
  category: 'planner',
  details: { services: ['decor', 'catering'], planningStage: 'idea', guestCount: 200, budgetMin: 100000, budgetMax: 300000 },
};
const performer = {
  ...basics,
  category: 'performer',
  details: { performerType: 'singer', performersNeeded: 2, durationMinutes: 60, budgetPerPerformer: 25000 },
};
const crew = {
  ...basics,
  category: 'crew',
  details: { roles: [{ role: 'sound', count: 3 }], experienceLevel: 'expert', shiftHours: 8, numberOfDays: 2, budgetPerDay: 3000 },
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  ({ default: app } = await import('../src/app.js'));
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await mongoose.connection.collection('requirements').deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('POST /api/v1/requirements', () => {
  it.each([['planner', planner], ['performer', performer], ['crew', crew]])(
    'creates a %s requirement',
    async (category, body) => {
      const res = await request(app).post('/api/v1/requirements').send(body);
      expect(res.status).toBe(201);
      expect(res.body.data.category).toBe(category);
      expect(res.body.data.details).toBeDefined();
    },
  );

  it('sets endDate = startDate for single-day events', async () => {
    const res = await request(app).post('/api/v1/requirements').send(planner);
    expect(res.body.data.endDate).toBe(res.body.data.startDate);
  });

  it('rejects an unknown category', async () => {
    const res = await request(app).post('/api/v1/requirements').send({ ...planner, category: 'chef' });
    expect(res.status).toBe(422);
  });

  it('rejects details that do not match the category', async () => {
    const res = await request(app).post('/api/v1/requirements').send({ ...planner, details: crew.details });
    expect(res.status).toBe(422);
  });

  it('rejects a date range where end is before start', async () => {
    const res = await request(app)
      .post('/api/v1/requirements')
      .send({ ...planner, dateType: 'range', startDate: future(10), endDate: future(5) });
    expect(res.status).toBe(422);
    expect(res.body.errors[0].field).toBe('endDate');
  });

  it('rejects a past start date', async () => {
    const res = await request(app).post('/api/v1/requirements').send({ ...planner, startDate: '2020-01-01' });
    expect(res.status).toBe(422);
  });

  it('rejects malformed JSON', async () => {
    const res = await request(app).post('/api/v1/requirements').set('Content-Type', 'application/json').send('{bad');
    expect(res.status).toBe(400);
  });
});

describe('GET /api/v1/requirements', () => {
  it('filters by category and paginates', async () => {
    await request(app).post('/api/v1/requirements').send(planner);
    await request(app).post('/api/v1/requirements').send(crew);

    const res = await request(app).get('/api/v1/requirements?category=crew&limit=5');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].category).toBe('crew');
    expect(res.body.meta.total).toBe(1);
  });

  it('returns 404 for a valid but missing id', async () => {
    const res = await request(app).get('/api/v1/requirements/64b7f0c2a1b2c3d4e5f60718');
    expect(res.status).toBe(404);
  });

  it('returns 422 for an invalid id', async () => {
    const res = await request(app).get('/api/v1/requirements/not-an-id');
    expect(res.status).toBe(422);
  });
});
