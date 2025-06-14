const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/extract-skills', auth, async (req, res) => {
  const skills = ['JavaScript', 'Node.js', 'MongoDB']; // Dummy data
  res.json({ skills });
});

router.get('/recommend-jobs/:seekerId', auth, async (req, res) => {
  res.json({ message: 'Recommended jobs endpoint (AI mock)' });
});

module.exports = router;
