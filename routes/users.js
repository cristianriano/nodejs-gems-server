var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/userController');

router.route('/')
  .post(UserCtrl.addUser);

//router.route('/:id')
//  .get(GemCtrl.findById);

module.exports = router;
