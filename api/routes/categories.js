const express = require("express");
const router = express.Router();
const {
  createCategory,
  allCategories,
} = require("../controllers/categoryController");

// @POST for new post
router.post("/", createCategory);

// @PUT for all posts
router.get("/", allCategories);

module.exports = router;
