const router = require('express').Router();
const postsController = require('../controllers/postsController')

router.post('/post', postsController.postPost)

router.post('/post/delete/:postId', postsController.deletePost)

router.post('/post/edit/:postId', postsController.editPost)

router.get('/', postsController.getAllPosts)

router.get('/post/random-image', postsController.getRandomImage)

router.get('/protected', postsController.getProtected)

module.exports = router