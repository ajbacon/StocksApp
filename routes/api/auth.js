const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');

// Load input validation
const validateLoginInput = require('../../validation/login');

// @route     GET api/auth
// @desc      test route
// @access    public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    console.log('here');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// --------------------------------------------------------------------
// @route POST api/auth
// @desc Login user and return JWT token
// @access Public
// --------------------------------------------------------------------
router.post('/', async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // destructuring
  const { email, password } = req.body;

  // Find user by email

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'invalid credentials' });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
