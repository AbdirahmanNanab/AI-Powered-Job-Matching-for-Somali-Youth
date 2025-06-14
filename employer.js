const router = require('express').Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

router.post('/post-job', auth, async (req, res) => {
  const job = new Job({ ...req.body, employerId: req.user.id });
  await job.save();
  res.status(201).json(job);
});

router.get('/jobs', auth, async (req, res) => {
  const jobs = await Job.find({ employerId: req.user.id });
  res.json(jobs);
});

module.exports = router;
