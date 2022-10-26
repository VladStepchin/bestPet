const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  imageUrl: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
});

module.exports = mongoose.model('Post', postSchema);
