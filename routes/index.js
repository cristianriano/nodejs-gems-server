var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/controller');
var passport = require('passport');

router.route('/')
  .get(Ctrl.renderRoot);

router.route('/register')
  .get(Ctrl.renderRegister);

router.route('/login')
  .post(Ctrl.login);

module.exports = router;
