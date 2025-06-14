const router = require('express').Router();
const User = require('../models/User');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

router.get('/users', auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/jobs', auth, async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

module.exports = router;
