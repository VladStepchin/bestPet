class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  async getPostsByUser(req, res, next) {
    let posts = await this.postService
      .list({ creatorId: req.user.id }, "likedBy")
      .catch(next);

    res.render("index", {
      pageTitle: "Index",
      posts,
      user: req.user,
    });
  }

  async getAllPosts(req, res, next) {
    let posts = await this.postService.list({}, "likedBy").catch(next);

    res.render("index", {
      pageTitle: "Index",
      posts,
      user: req.user,
    });
  }

  async postPost(req, res, next) {
    if (req.body && !req.body.content) {
      return next(new HttpError("Invalid body"));
    }
    const newPost = await this.postService
      .create({
        ...req.body,
        creatorId: req.user.id,
        likedBy: [],
      })
      .catch(next);

    console.log("The post has been create", newPost);

    res.redirect("/getPostsByUser");
  }

  async deletePost(req, res, next) {
    await this.postService.delete(req.params.postId).catch(next);
    res.redirect("/getPostsByUser");
  }

  async editPost(req, res, next) {
    if (req.body && !req.body.content) {
      return next(new HttpError("Invalid body"));
    }
    await this.postService.update(req.params.postId, req.body).catch(next);
    res.redirect("/"); // change to req.header.referrer
  }

  async incrementLike(req, res, next) {
    if (!req.params.postId) {
      return next(new HttpError("Invalid params"));
    }

    let updatedPost = await this.postService.updateLikes(
      req.params.postId,
      req.user.id
    );

    return res.json({
      likes: updatedPost.likedBy.length,
      likedBy: updatedPost.likedBy.map(_=> _.email),
    });
  }

  async getRandomImage(req, res, next) {
    //previously there were th module which randomly generated the images
    return res.json({
      imageUrl: "https://purr.objects-us-east-1.dream.io/i/AS1or.jpg",
    });
  }
}

module.exports = PostController;
