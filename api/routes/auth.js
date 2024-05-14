const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// @POST for registeration
router.post("/register", register);

// @POST for login
router.post("/login", login);

module.exports = router;