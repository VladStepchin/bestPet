// ask if async useful?
const Post = require("../models/Post");

class PostModule {
  static list(query, populateData = "") {
    return Post.find(query).populate(populateData).exec();
  }

  static create({ content, imageUrl, creatorId, likedBy }) {
    return new Post({ content, imageUrl, creatorId, likedBy }).save();
  }

  static delete(id) {
    return Post.findByIdAndDelete(id);
  }

  static update({ id, content, imageUrl }) {
    const updatedObject = { content, imageUrl };
    return Post.findByIdAndUpdate(id, updatedObject).exec();
  }
// change to automatically count likes
  static async updateLikes(postId, userId) {
    let increment = null;

    let postToUpdate = await Post.findById(postId);

    // refactor to automatically compute the likes
    if (!postToUpdate.likedBy.includes(userId)) {
      postToUpdate.likes += 1;
      postToUpdate.likedBy.push(userId);
      increment = true;
    } else {
      postToUpdate.likes -= 1;
      postToUpdate.likedBy.pull(userId);
      increment = false;
    }

    await postToUpdate.save();

    return postToUpdate.populate("likedBy");
  }
}

module.exports = PostModule;