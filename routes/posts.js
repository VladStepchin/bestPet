const router = require('express').Router();
const postsController = require('../controllers/PostsController')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/post',authMiddleware.auth, postsController.postPost)

router.post('/post/delete/:postId', authMiddleware.auth, postsController.deletePost)

router.post('/post/edit/:postId',authMiddleware.auth, postsController.editPost)

router.get('/', authMiddleware.showNameMiddleware, postsController.getAllPosts)

router.get('/posts', authMiddleware.auth, postsController.getAllPosts)

router.get('/getPostsByUser', authMiddleware.auth, postsController.getPostsByUser)

router.get('/post/random-image',authMiddleware.auth, postsController.getRandomImage)

router.patch('/post/:postId/like', authMiddleware.auth, postsController.incrementLike)

module.exports = router