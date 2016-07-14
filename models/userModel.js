var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  id: { type: "Number", required: true, default: 1 },
  name: { type: "String", required: true },
  email: { type: "String", required: true}
});

// Agrega index a la columna y uniquieness
//userSchema.index({ "id": 1 }, { unique: true });

userSchema.pre('save', function(next){
  var doc = this;
  mongoose.models['User'].find({}).sort({id: -1}).limit(1).exec(function(err, data){
    if(err) next(err);
    if(data.length > 0) doc.id = data[0].id + 1;
    next();
  });
});

userSchema.plugin(passportLocalMongoose, {
  // Cambia el campo username que se crea por defecto a email
  usernameField: 'email'
});

module.exports = mongoose.model('User', userSchema);

/*
userSchema.methods.authenticate = function authenticate (){
  return this.model('User').find({ email: this.email, password: this.password}, cb);
};
*/
