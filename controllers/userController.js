var mongoose = require('mongoose');
var User  = mongoose.model('User');

//POST - Insert a new User in the DB
exports.addUser = function(req, res, next) {
  console.log('POST /users');
  console.log(req.body);

  if(req.body.password != req.body.passwordRepeat){
    req.flash('danger', '<strong>Error</strong>. Your passwords does not match');
    res.render('register', {user: req.user});
    next();
  }
  else{
    User.register(new User({
      name: req.body.name,
      email: req.body.email
    }), req.body.password, function(err){
      if(err){
        //res.status(500).send(err.message);
        req.flash('danger', '<strong>Error</strong>. Your email is already in use');
        res.render('register', {user: req.user});
        return next(err);
      }
      req.flash('success', '<strong>Success!</strong> Now you can log-in');
      res.render('register', {user: req.user});
    });
  }

};


/*
var user = new User({
    name:     req.body.name,
    email:  req.body.email,
    password:   req.body.password,
});

user.save(function(err, user) {
  if(err) return res.status(500).send(err.message);
  res.status(200);
  req.flash('success', '<strong>Success!</strong> Now you can log-in');
  res.render('register', data);
});
*/
