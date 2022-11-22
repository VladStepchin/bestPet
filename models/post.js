const mongoose = require("mongoose");
const userSchema = require("./User").schema;
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  likedBy: [
    { 
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

postSchema.methods.updateLikes = function(){
  this.likes = this.likedBy.length;
}

module.exports = mongoose.model("Post", postSchema);
