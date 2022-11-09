const router = require('express').Router();
const postsController = require('../controllers/postsController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/post', postsController.postPost)

router.post('/post/delete/:postId', postsController.deletePost)

router.post('/post/edit/:postId', postsController.editPost)

router.get('/', postsController.getAllPosts)

router.get('/posts', authMiddleware.auth, postsController.getAllPosts)

router.get('/post/random-image',authMiddleware.auth, postsController.getRandomImage)

module.exports = router