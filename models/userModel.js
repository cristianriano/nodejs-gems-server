var moongose = require['mongoose'],
    Schema = moongose.Schema;

var userSchema = new Schema({
  id: { type: "Number", required: true },
  name: { type: "String", required: true }
});
