const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required :false,
      },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: false,
    },
    poster: {
        type:String,
        required: false
    },
    roles:[{
        type:String,
        ref:'Role'
    }]
})
module.exports = mongoose.model('User', userSchema)