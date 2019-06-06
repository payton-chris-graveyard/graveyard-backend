const mongoose = require('mongoose');
const Grave = require('../../lib/models/Grave');

describe('Grave model', () => {
  const graveyardId = new mongoose.Types.ObjectId;
  const occupantId = new mongoose.Types.ObjectId;
  it('has a occupied, occupant, and graveyard', () => {
    const grave = new Grave({
      occupied: true,
      occupant: occupantId,
      graveyard: graveyardId
    });

    expect(grave.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      occupied: true,
      occupant: occupantId,
      graveyard: graveyardId
    });
  });
  
  it('can create an empty grave', () => {
    const grave = new Grave({
      occupied: false,
      graveyard: graveyardId
    });

    expect(grave.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      occupied: false,
      graveyard: graveyardId
    });
  });

  it('has a required occupied', () => {
    const grave = new Grave({
      graveyard: graveyardId
    });
        
    const error = grave.validateSync().errors;
    expect(error.occupied.message).toBe('Path `occupied` is required.');
  });
  
  it('has a required graveyard and occupant', () => {
    const grave = new Grave({
      occupied: true
    });
        
    const error = grave.validateSync().errors;
    expect(error.graveyard.message).toBe('Path `graveyard` is required.');
    expect(error.occupant.message).toBe('Path `occupant` is required.');
  });
});
