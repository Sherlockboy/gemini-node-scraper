const axios = require("axios").default;
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

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

async function getHtmlContent(url, element, spa = false) {
  let response = null;

  if (spa) {
    response = await scrapeSpaContent(url, element);
  } else {
    response = await axios.get(url);
  }

  const $ = cheerio.load(response);

  return $(element).html();
}

async function getJsonContent(url, method = "GET", options = {}) {
  let response = null;

  if (method == "GET") {
    response = await axios.get(url, options);
  }

  if (method == "POST") {
    response = await axios.post(url, options);
  }

  return response.data;
}

module.exports = {
  getHtmlContent,
  getJsonContent,
};
