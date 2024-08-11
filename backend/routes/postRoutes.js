const express = require("express");
const {
  createPost,
  getPostByAuthorId,
  getAllPosts,
  getPostByAuthUser,
} = require("../controllers/postController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/post", authenticateToken, createPost);
router.get("/all-posts", getAllPosts);
router.get("/posts", authenticateToken, getPostByAuthUser);
router.get("/author-posts", getPostByAuthorId);

module.exports = router;
