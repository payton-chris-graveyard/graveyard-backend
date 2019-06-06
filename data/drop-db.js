require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const dropDb = async() => {
  await connect();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

dropDb();
