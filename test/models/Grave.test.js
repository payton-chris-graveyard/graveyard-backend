const mongoose = require('mongoose');
const Grave = require('../../lib/models/Grave');

describe('Grave model', () => {
  const graveyardId = new mongoose.Types.ObjectId;
  it('has a occupied and location', () => {

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
  
  it('has a required graveyard', () => {
    const grave = new Grave({
      occupied: false
    });
        
    const error = grave.validateSync().errors;
    expect(error.graveyard.message).toBe('Path `graveyard` is required.');
  });
  
  it('has a required occupant if occupied', () => {
    const grave = new Grave({
      occupied: true,
      graveyard: graveyardId
    });
        
    const error = grave.validateSync().errors;
    expect(error.occupant.message).toBe('Path `occupant` is required.');
  });
});
