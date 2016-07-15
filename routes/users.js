var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/userController');

router.route('/')
  .post(UserCtrl.addUser);

router.route('/:id')
  .patch(UserCtrl.editUser);

module.exports = router;
