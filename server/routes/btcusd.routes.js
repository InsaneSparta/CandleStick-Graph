const router = require('express').Router();
let Btcusd = require('../models/btcusd.model');

router.route('/').get((req, res) => {
  Btcusd.find()
    .then(btcusd => res.json(btcusd))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;