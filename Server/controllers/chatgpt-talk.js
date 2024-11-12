const OpenAI = require("openai");
const jwt = require("jsonwebtoken");
const isFalsy = require("../utils/is-falsy.js");

const chatgptTalk = async (req, res) => {
  const userInput = req.body.text;
  const token = req.body.token;

  const decoded = jwt.verify(token, process.env.SECRET_JWT);
  console.log(decoded);

  isFalsy(decoded);

  const openAIClient = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  messagesFlow.push({
    role: "user",
    content: `My name is ${decoded.fName}` + userInput,
  });

  if (userInput === "clear") {
    messagesFlow = [];
    console.log(`Cleared conversation: ${messagesFlow}`);
  }

  try {
    const chatCompletion = await openAIClient.chat.completions.create({
      messages: messagesFlow,
      model: "gpt-4",
    });

    const responseContent = chatCompletion.choices[0].message.content;

    messagesFlow.push({ role: "assistant", content: responseContent });

    res.status(200).json({
      message: "success",
      response: responseContent,
    });

    console.log(messagesFlow);
  } catch (error) {
    res.status(500).json({ error: "An error occurred with the AI request" });
  }
};

let messagesFlow = [
  {
    role: "user",
    content: `I'm thinking of a specific character (or object, animal, profession), can you guess who (or what) it is?`,
  },
];

module.exports = chatgptTalk;
