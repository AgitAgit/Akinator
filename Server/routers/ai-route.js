const express = require("express");
const {
  chatgptTalk,
  resetConversation,
} = require("../controllers/chatgpt-talk.js");

const aiRoute = express.Router();

aiRoute.post("/prompt", chatgptTalk);
aiRoute.post("/clear", resetConversation);

module.exports = aiRoute;
