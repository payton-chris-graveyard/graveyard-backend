require('../connect-db');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');

describe('grave routes', () => {
  const graveyardId = new mongoose.Types.ObjectId;

  const emptyGrave = {
    occupied: false,
    graveyard: graveyardId
  };

  const testOccupant = {
    name: 'greg',
    dob: '12/01/1900',
    dod: '12/01/2000',
    causeOfDeath: 'fell',
    epitaph: 'nice guy'
  };

  it('can create an occupant', async() => {
    const res = await request(app)
      .post('/api/v1/graves/occupant')
      .send(testOccupant);

    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      name: 'greg',
      dob: '12/01/1900',
      dod: '12/01/2000',
      causeOfDeath: 'fell',
      epitaph: 'nice guy'
    });
  });
  it('can create a grave', async() => {
    const occupantRes = await request(app)
      .post('/api/v1/graves/occupant')
      .send(testOccupant);
    const occupantId = occupantRes.body._id;

    const testGrave = {
      occupied: true,
      occupant: occupantId,
      graveyard: graveyardId
    };

    const res = await request(app)
      .post('/api/v1/graves')
      .send(testGrave);
    
    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      occupied: true,
      occupant: occupantId.toString(),
      graveyard: graveyardId.toString()
    });
  });
  
  it('can create an empty grave', async() => {
    const res = await request(app)
      .post('/api/v1/graves')
      .send(emptyGrave);
    
    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      occupied: false,
      graveyard: graveyardId.toString()
    });
  });
  
  it('can get all graves', async() => {
    const occupantRes = await request(app)
      .post('/api/v1/graves/occupant')
      .send(testOccupant);
    const occupantId = occupantRes.body._id;

    const testGrave = {
      occupied: true,
      occupant: occupantId,
      graveyard: graveyardId
    };

    await request(app)
      .post('/api/v1/graves')
      .send(testGrave);
      
    const res = await request(app)
      .get('/api/v1/graves');

    expect(res.body).toEqual([{
      _id: expect.any(String),
      __v: 0,
      occupied: true,
      occupant: {
        _id: occupantId.toString(),
        __v: 0,
        name: 'greg',
        dob: '12/01/1900',
        dod: '12/01/2000',
        causeOfDeath: 'fell',
        epitaph: 'nice guy'
      },
      graveyard: graveyardId.toString()
    }]);
  });
  
  it('can get a grave by id', async() => {
    const occupantRes = await request(app)
      .post('/api/v1/graves/occupant')
      .send(testOccupant);
    const occupantId = occupantRes.body._id;

    const testGrave = {
      occupied: true,
      occupant: occupantId,
      graveyard: graveyardId
    };

    const createdTestGrave = await request(app)
      .post('/api/v1/graves')
      .send(testGrave);
    
    const res = await request(app)
      .get(`/api/v1/graves/${createdTestGrave.body._id}`);

    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      occupied: true,
      occupant: {
        _id: occupantId.toString(),
        __v: 0,
        name: 'greg',
        dob: '12/01/1900',
        dod: '12/01/2000',
        causeOfDeath: 'fell',
        epitaph: 'nice guy'
      },
      graveyard: graveyardId.toString()
    });
  });
  
  it('can get update a grave by id', async() => {
    const occupantRes = await request(app)
      .post('/api/v1/graves/occupant')
      .send(testOccupant);
    const occupantId = occupantRes.body._id;

    const createdTestGrave = await request(app)
      .post('/api/v1/graves')
      .send(emptyGrave);
    
    const res = await request(app)
      .patch(`/api/v1/graves/${createdTestGrave.body._id}`)
      .send({
        occupied: true,
        occupant: occupantId
      });

    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      occupied: true,
      occupant: occupantId.toString(),
      graveyard: graveyardId.toString()
    });
  });
});
