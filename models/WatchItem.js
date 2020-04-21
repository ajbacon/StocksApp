const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchItemSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = WatchItem = mongoose.model('watchItem', WatchItemSchema);
