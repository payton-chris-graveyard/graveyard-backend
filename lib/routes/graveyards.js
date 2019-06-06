const { Router } = require('express');
const Graveyard = require('../models/Graveyard');
const Grave = require('../models/Grave');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const {
      name,
      location,
      totalGraves,
      occupiedGraves
    } = req.body;
    try {
      const createdGraveyard = await Graveyard
        .create({
          name,
          location,
          totalGraves,
          occupiedGraves
        });
      res.send(createdGraveyard);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const graveyards = await Graveyard
        .find()
        .lean();
      res.send(graveyards);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;

      const graveyard = await Graveyard
        .findById(id)
        .lean();

      const graves = await Grave
        .find({ graveyard: id })
        .lean();
      graveyard.graves = graves;
      
      res.send(graveyard);
    } catch(err) {
      next(err);
    }
  });
