const express = require('express');
const app = express();
const data = require('../data/cities.json');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV = 'test'
}));

app.use(express.json());

// routes go here
// eslint-disable-next-line
app.use('/', (req, res, next) => res.send(data));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
