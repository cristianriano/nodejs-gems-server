var mongoose = require('mongoose');
var User  = mongoose.model('User');

// GET - Pagina raiz, de inicio
exports.renderRoot = function(req, res){
  console.log('GET /');

  res.status(200);
  res.render('index', {user: req.user});
};

// GET - Pagina para registrarse
exports.renderRegister = function(req, res){
  console.log('GET /register');

  res.status(200);
  res.render('register', {user: req.user});
};

// POST - Login
exports.login = function(req, res, next){
  console.log('POST /login');
  console.log(req.body);

  User.authenticate()(req.body.email, req.body.password, function(err, user){
    if(err){
      req.flash('warning', '<strong>Try again later.</strong> Looks like there is a problem with the server');
      res.render('index', {user: req.user});
      next();
    }
    if(!user){
      req.flash('danger', '<strong>Error</strong>. Invalid email or password');
      res.render('index', {user: req.user});
      next();
    }
    else{
      req.login(user, function(err){
        if(err) return next(err);
        return res.redirect('/');
      });
    }

  });

};
