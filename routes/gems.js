var express = require('express');
var router = express.Router();
var GemCtrl = require('../controllers/gemController');

router.route('/')
  .get(GemCtrl.findAllGems)
  .post(GemCtrl.addGem);

router.route('/:id')
  .get(GemCtrl.findById);

router.route('/:id/reviews')
  .post(GemCtrl.addReview);

module.exports = router;
