const mongoose = require('mongoose');
const Graveyard = require('../../lib/models/Graveyard');

describe('Graveyard model', () => {
  it('has a name, location, totalGraves, and occupiedGraves', () => {
    const graveyard = new Graveyard({
      name: 'test graveyard',
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      totalGraves: 100,
      occupiedGraves: 20
    });

    expect(graveyard.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'test graveyard',
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      totalGraves: 100,
      occupiedGraves: 20
    });
  });

  it('has a required name', () => {
    const graveyard = new Graveyard({
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      totalGraves: 100,
      occupiedGraves: 20
    });

    const error = graveyard.validateSync().errors;
    expect(error.name.message).toBe('Path `name` is required.');
  });

  it('has a required location', () => {
    const graveyard = new Graveyard({
      name: 'test graveyard',
      totalGraves: 100,
      occupiedGraves: 20
    });

    const error = graveyard.validateSync().errors;
    expect(error['location.lat'].message).toBe('Path `location.lat` is required.');
    expect(error['location.lng'].message).toBe('Path `location.lng` is required.');
    expect(error['location.city'].message).toBe('Path `location.city` is required.');
    expect(error['location.state'].message).toBe('Path `location.state` is required.');
  });

  it('has a required totalGraves', () => {
    const graveyard = new Graveyard({
      name: 'test graveyard',
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      occupiedGraves: 20
    });

    const error = graveyard.validateSync().errors;
    expect(error.totalGraves.message).toBe('Path `totalGraves` is required.');
  });
});
