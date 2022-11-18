const router = require('express').Router();
const postsController = require('../controllers/PostsController')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/post/delete/:postId',
            authMiddleware.auth,
            postsController.deletePost)

router.post('/post/edit/:postId',
            authMiddleware.auth,
            postsController.editPost)

router.get('/post/random-image',
            authMiddleware.auth,
            postsController.getRandomImage)

router.patch('/post/:postId/like',
            authMiddleware.auth,
            postsController.incrementLike)

router.get('/getPostsByUser',
            authMiddleware.auth,
            postsController.getPostsByUser)

router.post('/post',
            authMiddleware.auth,
            postsController.postPost)

router.get('/',authMiddleware.showNameMiddleware,
            postsController.getAllPosts)

module.exports = router