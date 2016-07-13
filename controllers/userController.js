var mongoose = require('mongoose');
var User  = mongoose.model('User');

var data = {
  title: "Crafted Gems Store",
  projectName: "Crafted Gems"
};

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {
  console.log('POST /users');
  console.log(req.body);

  if(req.body.password != req.body.passwordRepeat){
    req.flash('info', 'Error. Your passwords does not match');
    res.render('register', data);
  }
  else{
    var user = new User({
        name:     req.body.name,
        email:  req.body.email,
        password:   req.body.password,
    });

    user.save(function(err, user) {
      if(err) return res.status(500).send(err.message);
      res.status(200);
      req.flash('info', 'Success! Now you can log-in');
      res.render('register', data);
    });
  }

};
