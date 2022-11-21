const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const Post = require("../models/Post");
const PostsController = require("../controllers/PostsController");
const PostService = require("../modules/PostService");
const Repository = require("../core/Repository");

const postService = new PostService(new Repository(Post));
const postController = new PostsController(postService);

router.post(
  "/post/delete/:postId",
  authMiddleware.auth,
  postController.deletePost.bind(postController)
);

router.post(
  "/post/edit/:postId",
  authMiddleware.auth,
  postController.editPost.bind(postController)
);

router.get(
  "/post/random-image",
  authMiddleware.auth,
  postController.getRandomImage.bind(postController)
);

router.patch(
  "/post/:postId/like",
  authMiddleware.auth,
  postController.incrementLike.bind(postController)
);

router.get(
  "/getPostsByUser",
  authMiddleware.auth,
  postController.getPostsByUser.bind(postController)
);

router.post(
  "/post",
  authMiddleware.auth,
  postController.postPost.bind(postController)
);

router.get(
  "/",
  authMiddleware.showNameMiddleware,
  postController.getAllPosts.bind(postController)
);

module.exports = router;
