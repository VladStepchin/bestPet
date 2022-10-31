const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const googleUserSchema = new Schema({
  googleId: {
    type: String,
    required :true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  imageUrl: {
    type:String,
    required: true
  }

});

module.exports = mongoose.model('GoogleUser', googleUserSchema);