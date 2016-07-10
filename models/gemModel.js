var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var gemSchema = new Schema({
  id:     { type: Number, required: true },
  name:    { type: String, required: true },
  description:     { type: String },
  shine:  { type: Number },
  price:   { type: Number, required: true },
  rarity:  { type: Number },
  color:  { type: String },
  faces:  { type: Number },
  images:  { type: [String] },
  reviews: { type: Array, ref: 'Review'}
});

module.exports = mongoose.model('Gem', gemSchema);
