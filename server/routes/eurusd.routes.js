const router = require('express').Router();
let Eurusd = require('../models/eurusd.model');

router.route('/').get((req, res) => {
  Eurusd.find()
    .then(eurusd => res.json(eurusd))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;