const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'ccny-pedals',
    description: 'aggregate stats of nearby bike/scooters for fast/cheap transportation',
  });
});


module.exports = router;