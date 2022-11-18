// change to class

const animals = require("random-animals-api");
const PostModule = require("../modules/PostModule");

exports.getPostsByUser = async (req, res, next) => {
  let posts = await PostModule.list({ creatorId: req.user.id }, "likedBy").catch(next);

  res.render("index", {
    pageTitle: "Index",
    posts,
    user: req.user,
  });
};

exports.getAllPosts = async (req, res, next) => {
  console.log(req.user);
  let posts = await PostModule.list({}, "likedBy").catch(next);

  res.render("index", {
    pageTitle: "Index",
    posts,
    user: req.user,
  });
};

exports.postPost = async (req, res, next) => {  
  if (req.body && !req.body.name) {
    return next(new HttpError('Invalid body'));
  }
  const newPost = await PostModule.create({
    ...req.body,
    creatorId: req.user.id,
    likedBy: [],
  }).catch(next);

  console.log("The post has been create", newPost);

  res.redirect("/getPostsByUser");
};

exports.deletePost = async (req, res, next) => {
  await PostModule.delete(req.params.postId).catch(next);
  res.redirect("/getPostsByUser");
};

exports.editPost = async (req, res, next) => {
  if (req.body && !req.body.name) {
    return next(new HttpError('Invalid body'));
  }
  await PostModule.update({ ...req.body, id: req.params.postId }).catch(next);
  res.redirect("/"); // check req.header.referrer
};

// split into two separate actions

exports.incrementLike = async (req, res, next) => {
  if (!req.params.postId) {
    return next(new HttpError('Invalid body'));
  }

  let updatedPost = await PostModule.updateLikes(
    req.params.postId,
    req.user.id
  );

  return res.json({
    likes: updatedPost.likes,
    likedBy: updatedPost.likedBy.map((_) => _.email),
  });
};

exports.getRandomImage = async (req, res, next) => {
  const url = await animals.cat();
  return res.json({ imageUrl: url });
};
