// change to class

const animals = require("random-animals-api");
const axios = require("axios").default;
const Post = require("../models/Post")
const PostService = require("../modules/PostService");
const Repository = require("../core/Repository")
const { HttpError } = require("../modules/utils");

const postService = new PostService(new Repository(Post))

exports.getPostsByUser = async (req, res, next) => {
  let posts = await postService.list({ creatorId: req.user.id }, "likedBy").catch(next);

  res.render("index", {
    pageTitle: "Index",
    posts,
    user: req.user,
  });
};

exports.getAllPosts = async (req, res, next) => {
  let posts = await postService.list({}, "likedBy").catch(next);

  res.render("index", {
    pageTitle: "Index",
    posts,
    user: req.user,
  });
};

exports.postPost = async (req, res, next) => {  
  if (req.body && !req.body.content) {
    return next(new HttpError('Invalid body'));
  }
  const newPost = await postService.create({
    ...req.body,
    creatorId: req.user.id,
    likedBy: [],
  }).catch(next);

  console.log("The post has been create", newPost);

  res.redirect("/getPostsByUser");
};

exports.deletePost = async (req, res, next) => {
  await postService.delete(req.params.postId).catch(next);
  res.redirect("/getPostsByUser");
};

exports.editPost = async (req, res, next) => {
  if (req.body && !req.body.content) {
    return next(new HttpError('Invalid body'));
  }
  await postService.update(req.params.postId, req.body).catch(next);
  res.redirect("/"); // change to req.header.referrer
};


exports.incrementLike = async (req, res, next) => {
  if (!req.params.postId) {
    return next(new HttpError('Invalid params'));
  }

  let updatedPost = await postService.updateLikes(
    req.params.postId,
    req.user.id
  );

  return res.json({
    likes: updatedPost.likedBy.length,
    likedBy: updatedPost.likedBy.map((_) => _.email),
  });
};

exports.getRandomImage = async (req, res, next) => {
  return res.json({ imageUrl: "https://purr.objects-us-east-1.dream.io/i/AS1or.jpg" });
};
