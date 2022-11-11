const Post = require("../models/Post");
const User = require("../models/User");
const Utils = require("../utils/utils");

const randomNumberTo30 = () => {
  return Math.floor(Math.random() * 30);
};

exports.getPostsByUser = async (req, res, next) => {
  let posts = await Post.find({ userId: req.user.id });
  console.log(posts);
  res.render("index", {
    pageTitle: "Index",
    posts,
    user: req.user,
  });
};

exports.getAllPosts = async (req, res, next) => {
  let posts = await Post.find();
  res.render("index", {
    pageTitle: "Index",
    posts,
    user: req.user,
  });
};

exports.postPost = async (req, res, next) => {
  debugger;
  let post = new Post({
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    userId: req.user.id,
    likedBy: [],
  });
  await post
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

exports.deletePost = async (req, res, next) => {
  await Post.findByIdAndRemove(req.params.postId).then(res.redirect("/"));
};

exports.editPost = async (req, res, next) => {
  let postId = req.params.postId;
  let updatedPost = {
    content: req.body.content,
    imageUrl: req.body.imageUrl,
  };
  await Post.findByIdAndUpdate(postId, updatedPost).then();
  res.redirect("/");
};

exports.incrementLike = async (req, res, next) => {
  try {
    let postId = req.params.postId;
    if (!postId) {
      throw new Error("No such post");
    }
    let postToUpdate = await Post.findById(postId).populate("userId");
    console.log(postToUpdate);

    if (!postToUpdate.likedBy.includes(req.user.id)) {
      postToUpdate.likes +=1;
      postToUpdate.likedBy.push(req.user.id)
      postToUpdate.save();
    }
    
    return res.json({likes: postToUpdate.likes, likedBy: postToUpdate.userId.email}).end();

  } catch (err) {
    console.log(err);
  }

  return res.sendStatus(200);
};

exports.getRandomImage = async (req, res, next) => {
  let result = await Utils.getRandomImage(),
    imageUrl = result.data[randomNumberTo30()].download_url;

  res.json({ imageUrl: imageUrl });
};
