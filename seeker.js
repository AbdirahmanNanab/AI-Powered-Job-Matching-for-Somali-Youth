const router = require('express').Router();
const User = require('../models/User');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

router.put('/profile', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { profile: req.body }, { new: true });
  res.json(user);
});

router.get('/recommended-jobs', auth, async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

module.exports = router;
