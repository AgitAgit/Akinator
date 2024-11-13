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
    content: `My name is ${decoded.fName} ` + userInput,
  });

  if (userInput === "clear") {
    messagesFlow = [
      {
        role: "user",
        content: `You are expert in akinator game, you must use the model of the game in order to win the game. guess who am I thinking of, in the shortest amount of responses. ask your first question.`,
      },
    ];
    res.status(200).json({
      message: "Chat has been cleared",
    });
    return;
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
    content: `You are expert in akinator game, you must use the model of the game in order to win the game. guess who am I thinking of, in the shortest amount of responses. ask your first question.`,
  },
];

module.exports = chatgptTalk;
