const fuzzysort = require('fuzzysort');
const symbolsUS = require('./US');

const results = fuzzysort.go('bab', symbolsUS, { key: 'symbol', limit: 10 });

console.log(results);
