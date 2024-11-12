const notValidPath = (req, res, next) => {
  res.status(404).json({
    message: "Unknown path entered.",
  });
  next();
};

module.exports = notValidPath;
