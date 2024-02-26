const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios").default;
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

require("dotenv").config();

const model = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
).getGenerativeModel({ model: process.env.GEMINI_MODEL });

async function countToken(input) {
  const response = await model.countTokens(input);

  return response.totalTokens;
}

async function scrapeSpaContent(url, element) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // Wait for a specific element to be present on the page
  await page.waitForSelector(element);

  // Get the HTML content after the SPA has fully loaded and executed JavaScript
  const html = await page.content();

  await browser.close();

  return html;
}

async function parseHTML(url, element, spa = false) {
  let response = null;

  if (spa) {
    response = await scrapeSpaContent(url, element);
  } else {
    response = await axios.get(url);
  }

  const $ = cheerio.load(response);

  return $(element).html();
}

async function run() {
  const html = await parseHTML(
    "https://en.ipakyulibank.uz/physical/exchange-rates/courses",
    "#__layout .application--wrap table",
    true
  );

  const prompt = `Parse exchange rates from the html table below and return response as JSON: "${html}"`;
  console.log(prompt);

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  console.log(response);
}

run();
