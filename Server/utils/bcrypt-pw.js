const bcrypt = require("bcrypt");

const hashUserPassword = async (userPassword) => {
  const encryptedPassword = await bcrypt.hash(userPassword, 10);
  return encryptedPassword;
};

const validateUserPassword = async (userPasswordEntered, storedHashedPassword) => {
  const isPasswordValid = await bcrypt.compare(userPasswordEntered, storedHashedPassword);
  return isPasswordValid;
};


module.exports = { hashUserPassword, validateUserPassword };
