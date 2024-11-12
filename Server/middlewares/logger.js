const fs = require("fs");

const logger = (req, res, next) => {
  const log = `
    Time: ${new Date().toLocaleString()} 
    Method: ${req.method} 
    URL: ${req.originalUrl} 
    IP: ${req.ip} 
  `;

  // Append the log to a file
  fs.appendFile("logs.txt", log, (err) => {
    if (err) console.error("Logging error:", err);
  });

  next();
};

module.exports = logger;
