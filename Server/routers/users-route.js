const express = require("express");
const {
  getAllUsers,
  partialUpdateUser,
  updateUserFullData,
  createNewUser,
  deleteUserById,
  validateUser,
} = require("../controllers/users-controller.js");

const usersRoute = express.Router();

usersRoute.get("/users", getAllUsers);

usersRoute.post("/users", createNewUser);

usersRoute.post("/users/login", validateUser);

usersRoute.put("/users/:id", updateUserFullData);

usersRoute.patch("/users/:id", partialUpdateUser);

usersRoute.delete("/users/:id", deleteUserById);

module.exports = usersRoute;
