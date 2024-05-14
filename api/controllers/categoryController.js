const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

// @POST for new category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @GET for all categories
const allCategories = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.find();
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = { createCategory, allCategories };