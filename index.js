const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const model = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
).getGenerativeModel({ model: process.env.GEMINI_MODEL });

async function countToken(input) {
  const response = await model.countTokens(input);

  return response.totalTokens;
}

async function run() {
  // For text-only input, use the gemini-pro model
  const prompt = "Write a story about a magic backpack.";
  const tokenCount = await countToken(prompt);
  console.log("TOKEN COUNT " + tokenCount);

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}

run();
