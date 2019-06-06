require('../connect-db');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');

describe('grave routes', () => {
  const graveyardId = new mongoose.Types.ObjectId;
  const testGrave = {
    occupied: true,
    occupant: 'test corpse',
    graveyard: graveyardId
  };

  it('can create a grave', async() => {
    const res = await request(app)
      .post('/api/v1/graves')
      .send(testGrave);
    
    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      occupied: true,
      occupant: 'test corpse',
      graveyard: graveyardId.toString()
    });
  });
  
  it('can get all graves', async() => {
    await request(app)
      .post('/api/v1/graves')
      .send(testGrave);
      
    const res = await request(app)
      .get('/api/v1/graves');

    expect(res.body).toEqual([{
      _id: expect.any(String),
      __v: 0,
      occupied: true,
      occupant: 'test corpse',
      graveyard: graveyardId.toString()
    }]);
  });
  
  it('can get a grave by id', async() => {
    const createdTestGrave = await request(app)
      .post('/api/v1/graves')
      .send(testGrave);
    
    const res = await request(app)
      .get(`/api/v1/graves/${createdTestGrave.body._id}`);

    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      occupied: true,
      occupant: 'test corpse',
      graveyard: graveyardId.toString()
    });
  });
});
