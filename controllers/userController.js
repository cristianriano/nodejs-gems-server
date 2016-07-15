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

// PATCH - Edit user
exports.editUser = function(req, res, next){
  console.log('PATCH /users/'+req.params.id);
  console.log(req.body);

  if(req.user.id != req.params.id){
    req.flash('danger', '<strong>Error</strong>.');
    res.render('index', {user: req.user});
    next();
  }
  else{
    var conditions = { id: req.params.id},
        update = { name: req.body.name},
        options = {};

    User.update(conditions, update, false, function(err, numAffected){
      if(err) {
        req.flash('warning', '<strong> Uups! </strong>. Looks like there is an error with our server, try again later');
        res.render('index', {user: req.user});
        next();
      }
      else{
        req.flash('success', '<strong>Success!</strong>. You have changed your name');
        res.render('index', {user: req.user});
        next();
      }
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
