const { Router } = require('express');
const Grave = require('../models/Grave');
const Graveyard = require('../models/Graveyard');
const Occupant = require('../models/Occupant');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const { occupied, occupant, graveyard } = req.body;
    try {
      const createdGrave = await Grave
        .create({ occupied, occupant, graveyard });
      
      // update occupiedGraves on graveyard
      await Graveyard
        .findByIdAndUpdate(graveyard, { $inc: { occupiedGraves: 1 } });
        
      res.send(createdGrave);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const graves = await Grave
        .find()
        .populate('occupant')
        .lean();
      res.send(graves);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const grave = await Grave
        .findById(id)
        .populate('occupant')
        .lean();
      res.send(grave);
    } catch(err) {
      next(err);
    }
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const { occupied, occupant } = req.body;
      const grave = await Grave
        .findByIdAndUpdate(id, { occupied, occupant }, { new: true });

      res.send(grave);
    } catch(err) {
      next(err);
    }
  })

  // Occupant
  .post('/occupant', async(req, res, next) => {
    const { name, dob, dod, causeOfDeath, epitaph } = req.body;
    try {
      const newOccupant = await Occupant
        .create({ name, dob, dod, causeOfDeath, epitaph });
      res.send(newOccupant);
    } catch(err) {
      next(err);
    }
  });
