var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var reviewSchema = new Schema({
  stars:    { type: Number, required: true },
  body:     { type: String },
  author:  { type: String, required: true },
  createdOn:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
