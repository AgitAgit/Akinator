const OpenAI = require("openai");
const jwt = require("jsonwebtoken");
const isFalsy = require("../utils/is-falsy.js");

const chatgptTalk = async (req, res) => {
  const { text: userInput, token } = req.body;

  if (!userInput || !token) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    isFalsy(decoded);

    const openAIClient = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

    messagesFlow.push({
      role: "user",
      userName: decoded.fName,
      content: userInput,
    });

    const chatCompletion = await openAIClient.chat.completions.create({
      messages: messagesFlow,
      model: "gpt-4",
    });

    const responseContent = chatCompletion.choices[0].message.content;

    messagesFlow.push({ role: "assistant", content: responseContent });

    res.status(200).json({ message: "success", response: responseContent });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Error occurred with the AI request";

    res.status(500).json({
      message: "Failed",
      response: errorMessage,
      errorStatus: error.status || 500,
      errorMessage: error.message,
    });
  }
};

let messagesFlow = [
  {
    role: "user",
    content:
      "You are an expert at the Akinator game and must use its questioning model to guess who I am thinking of. I will only reply with 'Yes,' 'No,' or 'Maybe.' Your goal is to guess who I am thinking of in the fewest possible questions. Ask your first question.",
  },
];

const resetConversation = async (req, res) => {
  const { text: userInput, token } = req.body;

  if (!userInput || !token) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    isFalsy(decoded);

    if (userInput === "clear") {
      messagesFlow = [
        {
          role: "user",
          userName: decoded.fName,
          content:
            "You are an expert at the Akinator game and must use its questioning model to guess who I am thinking of. I will only reply with 'Yes,' 'No,' or 'Maybe.' Your goal is to guess who I am thinking of in the fewest possible questions. Ask your first question.",
        },
      ];
      res
        .status(200)
        .json({ message: "Success", response: "Chat has been cleared." });
    } else {
      res.status(404).json({
        message: "Failed",
        response: "Invalid request to reset conversation.",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed", response: "Token verification failed" });
  }
};

module.exports = { chatgptTalk, resetConversation };
