const Post = require('../Models/postSchema');

const addPost = async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({
    title,
    content,
    author: req.user._id,
  });
  await newPost.save();
  res.json(newPost);
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username');
  res.json(posts);
};

module.exports = {
  addPost,
  getAllPosts,
};
