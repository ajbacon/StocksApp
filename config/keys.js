if (process.env.NODE_ENV === 'production') {
  // production set of keys
  module.exports = require('./prod');
} else {
  // dev set of keys
  module.exports = require('./dev');
}
