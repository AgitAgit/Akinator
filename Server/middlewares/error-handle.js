const errorHandle = (err, req, res, next) => {
  if (err) {
    console.error(`Error has occurred: ${err.message || err}`);
    res.status(500).json({
      message: "An internal server error occurred.",
      error: err.message || "Server Error",
    });
  }

  next();
};

module.exports = errorHandle;
