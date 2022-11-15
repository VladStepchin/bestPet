const Post = require("../models/Post");
const Utils = require("../utils/utils");
const animals = require('random-animals-api');

exports.getPostsByUser = async (req, res, next) => {
  let posts = await Post.find({ creatorId: req.user.id }).populate('likedBy');
  console.log(posts);
  res.render("index", {
    pageTitle: "Index",
    posts,
    user: req.user,
  });
};

exports.getAllPosts = async (req, res, next) => {
  let posts =   await Post.find().populate('likedBy');
  res.render("index", {
    pageTitle: "Index",
    posts,
    user: req.user,
  });
};

exports.postPost = async (req, res, next) => {
  console.log(req);
  let post = new Post({
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    creatorId: req.user.id,
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

// split into two separate actions?

exports.incrementLike = async (req, res, next) => {
  try {
    let postId = req.params.postId;
    let increment = null;

    if (!postId) {
      throw new Error("No such post");
    }
    let postToUpdate = await Post.findById(postId);

    console.log('Post', postToUpdate);

    if (!postToUpdate.likedBy.includes(req.user.id)) {
      postToUpdate.likes +=1;
      postToUpdate.likedBy.push(req.user.id)
      increment = true;
    }
    else {
      postToUpdate.likes -=1;
      postToUpdate.likedBy.pull(req.user.id)
      increment = false
    }
    await postToUpdate.save();
    
    let postWithPopulatedFields = await postToUpdate.populate('likedBy');
    
    // need to move whole object instead of a part 
    return res.json(
      {
        likes: postWithPopulatedFields.likes,
        likedBy: postWithPopulatedFields.likedBy.map(user => user.email),
        increment
      })
      .end();

  } catch (err) {
    console.log(err);
  }

  return res.sendStatus(200);
};

exports.getRandomImage = async (req, res, next) => {
  const url = await animals.cat()
  return res.json({ imageUrl: url });
};
