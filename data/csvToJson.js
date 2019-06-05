const Papa = require('papaparse');
const fs = require('fs');


const rs = fs.createReadStream('./data/small.csv', {
  encoding: 'utf8',
  highWaterMark: 64 * 1028
});
const ws = fs.createWriteStream('./data/cities.json');

let body = '';
rs.on('data', chunk => {
  body += chunk;
});

rs.on('end', () => {
  const results = Papa.parse(body);
  ws.write(JSON.stringify(results));
  ws.end();
});
