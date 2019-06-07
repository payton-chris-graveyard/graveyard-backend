require('dotenv').config();
const chance = require('chance').Chance();
const mongoose = require('mongoose');
const Occupant = require('../lib/models/Occupant');
const Graveyard = require('../lib/models/Graveyard');
const Grave = require('../lib/models/Grave');
const connect = require('../lib/utils/connect');


const seedData = async({
  occupantCount = 100,
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

  await Promise.all([...Array(occupiedGraveCount)]
    .map(async() => {
      const graveyardId = noMoreThanOccupied(createdGraveyards);
      const occupiedGrave = {
        occupied: true,
        occupant: chance.pickone(createdOccupants)._id,
        graveyard: graveyardId
      };
      try {
        return Promise.all([
          Graveyard.findByIdAndUpdate(graveyardId, { $inc: { occupiedGraves: 1 } }), 
          Grave.create(occupiedGrave)
        ]);
      } catch(err) {
        console.log(err);
      }
    }));

  await Promise.all([...Array(unoccupiedGraveCount)]
    .map(async() => {
      const graveyardId = noMoreThanOccupied(createdGraveyards);
      const unoccupiedGrave = {
        occupied: false,
        graveyard: graveyardId
      };  
      try {
        return Promise.all([
          Graveyard.findByIdAndUpdate(graveyardId, { $inc: { occupiedGraves: 1 } }),
          Grave.create(unoccupiedGrave)
        ]);
      } catch(err) {
        console.log(err);
      }
    }));

  return mongoose.connection.close();
};

const noMoreThanOccupied = (createdGraveyards) => {
  let graveyard = null;
  do{
    graveyard = chance.pickone(createdGraveyards);
  } while(graveyard.occupiedGraves >= 9);

  return graveyard._id;    
};

connect();
seedData();
