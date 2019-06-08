require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const seedData = require('../data/seed-data');
const Grave = require('../lib/models/Grave');
const Graveyard = require('../lib/models/Graveyard');
const Occupant = require('../lib/models/Occupant');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = model => JSON.parse(JSON.stringify(model));

const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
  };
};

module.exports = {
  ...createGetters(Grave),
  ...createGetters(Graveyard),
  ...createGetters(Occupant)
};
