const mongoose = require('mongoose');
const Occupant = require('../../lib/models/Occupant');

describe('Occupant model', () => {
  it('has a name, dob, dod, cause of deat, and epitaph', () => {
    const occupant = new Occupant({
      name: 'greg',
      dob: '12/01/1900',
      dod: '12/01/2000',
      causeOfDeath: 'fell',
      epitaph: 'nice guy'
    });

    expect(occupant.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'greg',
      dob: '12/01/1900',
      dod: '12/01/2000',
      causeOfDeath: 'fell',
      epitaph: 'nice guy'
    });
  });
});
