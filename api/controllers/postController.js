const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

// @POST for new post
const createPost = asyncHandler(async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedpost = await newPost.save();        
        res.status(200).json(savedpost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @GET for all posts
const allPosts = asyncHandler(async (req, res) => {
  try {
      const posts = await Post.find();
      res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @PUT for update post
const updatePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
        try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can only update your posts!");
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

// @DELETE for delete post
const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post have Been Deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can only delete your posts!");
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

// @GET for a post
const singlePost = asyncHandler(async (req, res) => {
  try {
    const onepost = await Post.findById(req.params.id);
    res.status(200).json(onepost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { createPost, allPosts, updatePost, deletePost, singlePost };
