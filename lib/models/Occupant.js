const mongoose = require('mongoose');

const occupantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  dod: {
    type: String,
    required: true
  },
  causeOfDeath: {
    type: String,
    required: true
  },
  epitaph: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Occupant', occupantSchema);
