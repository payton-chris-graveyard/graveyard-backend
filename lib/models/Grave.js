const mongoose = require('mongoose');

const graveSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  graveyard: {
    type: mongoose.Schema.ObjectId,
    ref: 'Graveyard',
    required: true
  }
});

module.exports = mongoose.model('Grave', graveSchema);
