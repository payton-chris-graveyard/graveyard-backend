const { Router } = require('express');
const Graveyard = require('../models/Graveyard');

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
  });
