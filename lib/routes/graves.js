const { Router } = require('express');
const Grave = require('../models/Grave');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const { occupied, occupant, graveyard } = req.body;
    try {
      const createdGrave = await Grave
        .create({ occupied, occupant, graveyard });
      res.send(createdGrave);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const graves = await Grave
        .find()
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
        .lean();
      res.send(grave);
    } catch(err) {
      next(err);
    }
  });
