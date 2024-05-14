const express = require("express");
const router = express.Router();
const {
  createPost,
  allPosts,
  updatePost,
  deletePost,
  singlePost,
} = require("../controllers/postController");

// @POST for new post
router.post("/", createPost);

// @PUT for all posts
router.get("/", allPosts);

// @PUT for update post
router.put("/:id", updatePost);

// @DELTE for delete post
router.delete("/:id", deletePost);

// @GET for single post
router.get("/:id", singlePost);

module.exports = router;
