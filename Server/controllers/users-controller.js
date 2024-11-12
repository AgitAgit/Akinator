const isFalsy = require("../utils/is-falsy.js");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user-schema.js");
const {
  validateUserPassword,
  hashUserPassword,
} = require("../utils/bcrypt-pw.js");

const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await userModel.find();

    isFalsy(getAllUsers);

    res.status(200).json({
      message: "Success",
      response: getAllUsers,
    });
  } catch (error) {
    res.status(404).json({
      message: `Error occurred while getting all users: ${error}`,
    });
  }
};

const createNewUser = async (req, res) => {
  const { fName, user, password, email } = req.body;

  let hashedPassword = await hashUserPassword(password + process.env.SECRET_PW);

  isFalsy(hashedPassword);

  try {
    const newUser = await userModel.create({
      fName,
      user,
      password: hashedPassword,
      email,
    });

    isFalsy(newUser);

    res.status(201).json({
      message: "Success",
      response: `User has been created.`,
    });
  } catch (error) {
    res.status(404).json({
      message: `Error occurred while creating a new user: ${error}`,
    });
  }
};

const validateUser = async (req, res) => {
  const { fName, email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    isFalsy(user);

    const isValidatePassword = await validateUserPassword(
      password,
      user.password
    );

    isFalsy(isValidatePassword);

    const generateToken = jwt.sign(
      { fName: user.fName, email: user.email },
      process.env.SECRET_JWT,
      {
        expiresIn: "1h",
      }
    );

    isFalsy(generateToken);

    res.status(200).json({
      message: "Success",
      response: "User has logged in successfully",
      token: generateToken,
    });
  } catch (error) {
    res.status(404).json({
      message: `Error occurred while trying to validate user: ${error}`,
    });
  }
};

const updateUserFullData = async (req, res) => {
  const userId = req.params.id;
  const { user, password, email } = req.body;

  try {
    const isUpdated = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        user,
        password,
        email,
      },
      {
        new: true,
      }
    );

    isFalsy(isUpdated);

    res.status(201).json({
      message: "Success",
      response: `User ID: ${userId} has been updated.`,
    });
  } catch (error) {
    res.status(404).json({
      message: `Error occurred while updating user ID ${userId}: ${error}`,
    });
  }
};

const partialUpdateUser = async (req, res) => {
  const userId = req.params.id;
  const { user, password, email } = req.body;

  try {
    const isUpdated = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        user,
        password,
        email,
      },
      {
        new: true,
      }
    );

    isFalsy(isUpdated);

    res.status(201).json({
      message: "Success",
      response: `User has been updated.`,
    });
  } catch (error) {
    res.status(404).json({
      message: `Error occurred while updating user ID ${userId}: ${error}`,
    });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteUser = userModel.findByIdAndDelete(userId);

    isFalsy(deleteUser);

    res.status(200).json({
      message: "Success",
      response: `User ${userId} has been successfully deleted.`,
    });
  } catch (error) {
    res.status(404).json({
      message: `Error occurred while deleting user ID ${userId}: ${error}`,
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserFullData,
  partialUpdateUser,
  createNewUser,
  deleteUserById,
  validateUser,
};
