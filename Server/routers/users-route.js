const express = require("express");
const {
  partialUpdateUser,
  updateUserFullData,
  createNewUser,
  deleteUserById,
  validateUser,
  getUserDataById,
} = require("../controllers/users-controller.js");

const usersRoute = express.Router();

usersRoute.get("/:id", getUserDataById);

usersRoute.post("/register", createNewUser);

usersRoute.post("/login", validateUser);

usersRoute.put("/:id", updateUserFullData);

usersRoute.patch("/:id", partialUpdateUser);

usersRoute.delete("/:id", deleteUserById);

module.exports = usersRoute;
