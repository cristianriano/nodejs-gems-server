var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/controller');

router.route('/')
  .get(Ctrl.renderRoot);

router.route('/register')
  .get(Ctrl.renderRegister);

router.route('/login')
  .post(Ctrl.login);

router.route('/logout')
  .get(Ctrl.logout);

module.exports = router;
