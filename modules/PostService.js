class PostService {
  constructor(repository) {
    this.repository = repository;
  }

   list(query, populateData = "") {
    return this.repository.list(query, populateData);
  }

   findOne(criteria) {
    return this.repository.findOne(criteria);
  }

   create({ content, imageUrl, creatorId, likedBy }) {
    return this.repository
      .create({ content, imageUrl, creatorId, likedBy })
  }

   delete(id) {
    return this.repository.delete(id);
  }

   update(id, { content, imageUrl }) {
    const updatedObject = { content, imageUrl };
    return this.repository.update(id, updatedObject);
  }

   async updateLikes(postId, userId) {
    let postToUpdate = await this.repository.findOne({ _id: postId });

    postToUpdate.likedBy.includes(userId)
      ? postToUpdate.likedBy.pull(userId)
      : postToUpdate.likedBy.push(userId);

    //todo:add to the Mongoose as a function?
    postToUpdate.likes = postToUpdate.likedBy.length;
    await this.repository.update(postId, postToUpdate);

    return postToUpdate.populate("likedBy");
  }
}

module.exports = PostService;
