const mongoose = require('mongoose');

const graveyardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: String,
      required: true
    },
    lng: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  totalGraves: {
    type: Number,
    required: true
  },
  occupiedGraves: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Graveyard', graveyardSchema);
