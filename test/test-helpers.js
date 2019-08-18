const faker = require('faker');
const mongoose = require('mongoose');

const users = [
  {
    email: faker.internet.email(),
    username: 'username1',
    _id: '000000000000000000000001',
    password: '$2a$09$N0HgKVo6mX3tPyZAnhdTgO41R0vtrNzlDUOeGfNCUSeVd14AOyKQm'
  },
  {
    email: faker.internet.email(),
    username: 'username2',
    _id: '000000000000000000000002',
    password: '$2a$09$N0HgKVo6mX3tPyZAnhdTgO41R0vtrNzlDUOeGfNCUSeVd14AOyKQm'
  },
  {
    email: faker.internet.email(),
    username: 'username3',
    _id: '000000000000000000000003',
    password: '$2a$09$N0HgKVo6mX3tPyZAnhdTgO41R0vtrNzlDUOeGfNCUSeVd14AOyKQm'
  }
];

const jobs = () => {
  const seedData = [];
  for (let i = 0; i < 5; i++) {
    seedData.push({
      user_id: '000000000000000000000001',
      companyName: faker.company.companyName(),
      position: faker.name.jobTitle(),
      location: faker.address.city(),
      jobPosting: faker.internet.url,
      category: 'applied'
    });
  }

  return seedData;
};

module.exports = { users, jobs };
