var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var reveiwSchema = new Schema({
  stars:    { type: Number },
  body:     { type: String },
  author:  { type: String },
  createdOn:   { type: Date, default: Date.now }
});

//module.exports = mongoose.model('Review', reveiwSchema);
