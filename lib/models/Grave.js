const mongoose = require('mongoose');

const graveSchema = new mongoose.Schema({
  occupied: {
    type: Boolean,
    required: true
  },
  occupant: {
    type: String,
    required: function() {
      return this.occupied;
    }
  },
  graveyard: {
    type: mongoose.Schema.ObjectId,
    ref: 'Graveyard',
    required: true
  }
});

module.exports = mongoose.model('Grave', graveSchema);
