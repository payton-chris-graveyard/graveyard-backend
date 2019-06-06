require('dotenv').config();
const chance = require('chance').Chance();
const mongoose = require('mongoose');
const Occupant = require('../lib/models/Occupant');
const Graveyard = require('../lib/models/Graveyard');
const Grave = require('../lib/models/Grave');
const connect = require('../lib/utils/connect');


const seedData = async({
  occupantCount = 10,
  graveyardCount = 3,
  occupiedGraveCount = 10,
  unoccupiedGraveCount = 17
} = {}) => {
  const occupants = [...Array(occupantCount)]
    .map(() => ({
      name: chance.name(),
      dob: chance.date({ string: true }),
      dod: chance.date({ string: true }),
      causeOfDeath: chance.sentence(),
      epitaph: chance.sentence()
    }));

  const graveyards = [...Array(graveyardCount)]
    .map(() => ({
      name: chance.company(),
      location: {
        lat: chance.latitude(),
        lng: chance.longitude(),
        city: chance.city(),
        state: chance.state()
      },
      totalGraves: 9
    }));

  const createdOccupants = await Occupant.create(occupants);
  const createdGraveyards = await Graveyard.create(graveyards);

  const occupiedGraves = [...Array(occupiedGraveCount)]
    .map(() => ({
      occupied: true,
      occupant: chance.pickone(createdOccupants)._id,
      graveyard: chance.pickone(createdGraveyards)._id
    }));

  const unoccupiedGraves = [...Array(unoccupiedGraveCount)]
    .map(() => ({
      occupied: false,
      graveyard: chance.pickone(createdGraveyards)._id
    }));

  await Grave.create(occupiedGraves);
  await Grave.create(unoccupiedGraves);

  return mongoose.connection.close();
};

connect();
seedData();
