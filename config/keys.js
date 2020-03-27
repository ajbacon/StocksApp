if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV);
  // production set of keys
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'test') {
  console.log(process.env.NODE_ENV);
  // dev set of keys
  module.exports = require('./testenv');
} else {
  console.log(process.env.NODE_ENV);
  // dev set of keys
  module.exports = require('./dev');
}
