// Production only code - ignore from test coverage
/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
  // production set of keys
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'test') {
  // test set of keys
  module.exports = require('./testenv');
} else {
  // dev set of keys
  module.exports = require('./dev');
}
