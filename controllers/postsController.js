const Post = require('../models/post');
const Utils = require('../utils/utils');


const randomNumberTo30 = () => {
    return Math.floor(Math.random()*30);
  }

exports.getAllPosts = async (req, res, next) => {
    console.log('Request User', req.user);
    let authUser = req.user;
    let posts = await Post.find();
    res.render('index', { 
        pageTitle: 'Index',
        posts,
        user: authUser
    })
}

exports.postPost = async (req, res, next) => {
    let post = new Post({
        content: req.body.content,
        imageUrl: req.body.imageUrl
    })
    await post
    .save()
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
}

exports.deletePost = async (req, res, next) => {
    await Post
    .findByIdAndRemove(req.params.postId)
    .then(res.redirect("/"))
}

exports.editPost = async (req, res, next) => {
    let postId = req.params.postId;
    let updatedPost = {
        content: req.body.content,
        imageUrl: req.body.imageUrl
    }
    await Post.findByIdAndUpdate(postId, updatedPost).then()
    res.redirect('/')
}

exports.getRandomImage = async (req, res, next) => {
    let result = await Utils.getRandomImage(),
        imageUrl = result.data[randomNumberTo30()].download_url;

    res.json({imageUrl : imageUrl})
}
