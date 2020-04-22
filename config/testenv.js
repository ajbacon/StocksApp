module.exports = {
  mongoURI: `mongodb://localhost:27017/stocks-app-test${process.env.JEST_WORKER_ID}`,
  secretOrKey: 'SECRET',
};
