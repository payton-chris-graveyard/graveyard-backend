const mongoose = require('mongoose');
const Grave = require('../../lib/models/Grave');

describe('Grave model', () => {
  const graveyardId = new mongoose.Types.ObjectId;
  it('has a title and location', () => {

    const grave = new Grave({
      title: 'test grave',
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      graveyard: graveyardId
    });

    expect(grave.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'test grave',
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      graveyard: graveyardId
    });

  });
  
  it('has a required title', () => {
    const grave = new Grave({
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      graveyard: graveyardId
    });
        
    const error = grave.validateSync().errors;
    expect(error.title.message).toBe('Path `title` is required.');
  });
  
  it('has a required graveyard', () => {
    const grave = new Grave({
      title: 'test grave'
    });
        
    const error = grave.validateSync().errors;
    expect(error.graveyard.message).toBe('Path `graveyard` is required.');
  });
});
