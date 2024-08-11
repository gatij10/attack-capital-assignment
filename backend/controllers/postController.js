const Post = require("../models/Post");
const User = require("../models/User");

async function createPost(req, res) {
  const { title, content } = req.body;
  const newPost = new Post({
    title,
    content,
    authorId: req.user.userId,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const author = await User.findById(post.authorId);
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          authorName: author?.username,
          createdAt: post.createdAt,
        };
      })
    );
    res.json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send(error.message);
  }
}

async function getPostByAuthUser(req, res) {
  const query = { authorId: req.user.userId };
  try {
    const posts = await Post.find(query).populate("authorId", "email");
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getPostByAuthorId(req, res) {
  const query = { authorId: req.query.authorId };
  try {
    const posts = await Post.find(query);
    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const author = await User.findById(post.authorId);
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          authorName: author?.username,
          createdAt: post.createdAt,
        };
      })
    );
    res.json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostByAuthorId,
  getPostByAuthUser,
};
