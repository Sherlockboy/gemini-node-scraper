const { GoogleGenerativeAI } = require("@google/generative-ai");

const model = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
).getGenerativeModel({ model: process.env.GEMINI_MODEL });

async function countToken(input) {
  const response = await model.countTokens(input);

  return response.totalTokens;
}

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = {
  countToken,
  generateContent,
};
