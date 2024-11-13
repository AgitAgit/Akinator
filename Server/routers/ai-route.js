const express = require("express");
const chatGPTconversation = require("../controllers/chatgpt-talk.js");

const aiRoute = express.Router();

aiRoute.post("/prompt", chatGPTconversation);

module.exports = aiRoute;
