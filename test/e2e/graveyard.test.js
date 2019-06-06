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
});
