var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var review = {
  stars:    { type: Number },
  body:     { type: String },
  author:  { type: String },
  createdOn:   { type: Date, default: Date.now }
};

var gemSchema = new Schema({
  id:     { type: Number },
  name:    { type: String },
  description:     { type: String },
  shine:  { type: Number },
  price:   { type: Number },
  rarity:  { type: Number },
  color:  { type: String },
  faces:  { type: Number },
  images:  { type: [String] },
  reviews: { type: [review]}
});

module.exports = mongoose.model('Gem', gemSchema);
