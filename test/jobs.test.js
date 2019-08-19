const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jwt = require('jsonwebtoken');

const should = chai.should();
const { TEST_DB, JWT_SECRET } = require('../src/config');
const User = require('../src/models/User');
const Job = require('../src/models/Job');
const { runServer, closeServer } = require('../src/server');
const app = require('../src/app');

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('~~~~~~ Deleting Database ~~~~~~~');
    User.collection
      .drop()
      .then(res => resolve(res))
      .catch(err => reject(err));
    Job.collection
      .drop()
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

function seedDatabase() {
  Promise.all([seedUsers(), seedJobs()]);
}

function seedUsers() {
  console.info('Seeding users');
  const seedData = [];
  const user = new User();

  for (let i = 0; i < 5; i++) {
    let id = '00000000000000000000000' + i;
    seedData.push({
      _id: id,
      username: 'testuser' + i,
      email: faker.internet.email(),
      password: user.generateHash('P@ssw0rd')
    });
  }
  return User.insertMany(seedData);
}

function seedJobs() {
  console.info('Seeding jobs');
  const seedData = [];
  for (let i = 0; i < 5; i++) {
    seedData.push({
      user_id: '000000000000000000000001',
      companyName: faker.company.companyName(),
      position: faker.lorem.words(),
      location: faker.lorem.words(),
      jobPosting: faker.image.imageUrl()
    });
  }
  return Job.insertMany(seedData);
}

describe(`TrApp Job Tests`, () => {
  let token;

  before(() => {
    return runServer(TEST_DB, 8080);
  });

  beforeEach(() => {
    seedDatabase();
    token = jwt.sign(
      {
        id: '000000000000000000000001'
      },
      JWT_SECRET,
      { algorithm: 'HS256' }
    );
  });

  after(() => {
    return closeServer();
  });

  afterEach(() => {
    return tearDownDb();
  });

  describe('GET endpoints', () => {
    it(`should get all jobs for that user`, () => {
      return Job.find({ user_id: '000000000000000000000001' }).then(() => {
        return chai
          .request(app)
          .get('/api/jobs')
          .set('Authorization', `bearer ${token}`)
          .then(res => {
            // existance, datatype, value
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.have.lengthOf.at.least(1);
            res.body.forEach(job => {
              job.should.be.a('object');
            });
          });
      });
    });

    describe('POST endpoints', () => {
      it(`should post new job for that user`, () => {
        const newJob = {
          user_id: '000000000000000000000001',
          companyName: 'Test Company',
          category: 'applied',
          position: 'software engineer'
        };

        return chai
          .request(app)
          .post('/api/jobs/newjob')
          .set('Authorization', `bearer ${token}`)
          .send(newJob)
          .then(res => {
            // existance, datatype, value
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');
          });
      });
    });
  });
});
