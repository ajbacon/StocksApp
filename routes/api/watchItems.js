const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const WatchItem = require('../../models/WatchItem');

// @route    POST api/watchitems
// @desc     add a company to a personal watchlist
// @access   Private

router.post('/', auth, async (req, res) => {
  try {
    const userWatchItem = await WatchItem.findOne({
      symbol: req.body.symbol,
      description: req.body.description,
      userId: req.user.id,
    });

    if (userWatchItem) {
      return res
        .status(400)
        .json({ watchItem: 'Company already on user watch list' });
    }

    const newWatchItem = new WatchItem({
      symbol: req.body.symbol,
      description: req.body.description,
      userId: req.user.id,
    });

    const watchItem = await newWatchItem.save();

    res.json(watchItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/watchitems
// @desc      retrieve user saved watchlist items
// @access    private

router.get('/', auth, async (req, res) => {
  try {
    const items = await WatchItem.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
