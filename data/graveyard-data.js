const graveyards = [
  {
    name: 'Grandview Cemetery',
    location: {
      lat: '47.1443',
      lng: '-122.1408',
      city: 'Prairie Ridge',
      state: 'WA'
    },
    totalGraves: 9,
    occupiedGraves: 3
  },
  {
    name: 'Ebonwood Necropolis',
    location: {
      lat: '46.4412',
      lng: '-122.8493',
      city: 'Toledo',
      state: 'WA'
    },
    totalGraves: 9,
    occupiedGraves: 2
  },
  {
    name: 'Infernal Grove Mausoleum',
    location: {
      lat: '47.2328',
      lng: '-122.3517',
      city: 'Fife',
      state: 'WA'
    },
    totalGraves: 9,
    occupiedGraves: 1
  }
];

const graves = [];

const occupants = [];

module.exports = {
  graveyards,
  graves,
  occupants
};
