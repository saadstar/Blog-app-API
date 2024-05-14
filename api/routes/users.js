const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  singleUser,
} = require("../controllers/userController");

// @PUT for update user
router.put("/:id", updateUser);

// @DELTE for delete user
router.delete("/:id", deleteUser);

// @GET for single user
router.get("/:id", singleUser);

module.exports = router;
