const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const WatchItem = require('../../models/WatchItem');

// @route    POST api/watchitems
// @desc     add a company to a personal watchlist
// @access   Private

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    console.log(user);

    const newWatchItem = new WatchItem({
      symbol: req.body.symbol,
      userId: req.user.id,
    });

    const watchItem = await newWatchItem.save();

    res.json(watchItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
