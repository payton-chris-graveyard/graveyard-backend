require('../connect-db');
const request = require('supertest');
const app = require('../../lib/app');

describe('graveyard routes', () => {
  const testGraveyard = {
    name: 'test graveyard',
    location: {
      lat: '47.1443',
      lng: '-122.1408',
      city: 'Prairie Ridge',
      state: 'WA'
    },
    totalGraves: 100,
    occupiedGraves: 20
  };

  const testOccupant = {
    name: 'greg',
    dob: '12/01/1900',
    dod: '12/01/2000',
    causeOfDeath: 'fell',
    epitaph: 'nice guy'
  };

  it('can create a graveyard', async() => {
    const res = await request(app)
      .post('/api/v1/graveyards')
      .send(testGraveyard);
    
    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
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
  
  it('can get all graveyards', async() => {
    await request(app)
      .post('/api/v1/graveyards')
      .send(testGraveyard);
      
    const res = await request(app)
      .get('/api/v1/graveyards');
      
    expect(res.body).toEqual([{
      _id: expect.any(String),
      __v: 0,
      name: 'test graveyard',
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      totalGraves: 100,
      occupiedGraves: 20
    }]);
  });
  
  it('can get a graveyard by id with all graves', async() => {
    const createdGraveyard = await request(app)
      .post('/api/v1/graveyards')
      .send(testGraveyard);
    const graveyardId = createdGraveyard.body._id;

    const occupantRes = await request(app)
      .post('/api/v1/graves/occupant')
      .send(testOccupant);
    const occupantId = occupantRes.body._id;

    const testGrave1 = {
      occupied: true,
      occupant: occupantId,
      graveyard: graveyardId
    };
    
    const testGrave2 = {
      occupied: false,
      graveyard: graveyardId
    };

    await request(app)
      .post('/api/v1/graves')
      .send(testGrave1);
    await request(app)
      .post('/api/v1/graves')
      .send(testGrave2);

    const res = await request(app)
      .get(`/api/v1/graveyards/${graveyardId}`);
      
    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      name: 'test graveyard',
      location: {
        lat: '47.1443',
        lng: '-122.1408',
        city: 'Prairie Ridge',
        state: 'WA'
      },
      totalGraves: 100,
      occupiedGraves: 20,
      graves: [
        {
          _id: expect.any(String),
          __v: 0,
          occupied: true,
          occupant: {
            _id: expect.any(String),
            __v: 0,
            name: 'greg',
            dob: '12/01/1900',
            dod: '12/01/2000',
            causeOfDeath: 'fell',
            epitaph: 'nice guy'
          },
          graveyard: graveyardId.toString()
        },
        {
          _id: expect.any(String),
          __v: 0,
          occupied: false,
          graveyard: graveyardId.toString()
        }
      ]
    });
  });
});
